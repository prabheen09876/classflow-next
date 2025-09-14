
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, BookOpen } from "lucide-react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Homework {
  id: string;
  title: string;
  description: string;
  class: string;
  dueDate: string;
}

export default function TeacherHomeworkPage() {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetClass, setTargetClass] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "homework"), (snapshot) => {
      const newHomeworkList: Homework[] = [];
      snapshot.forEach((doc) => {
        newHomeworkList.push({ id: doc.id, ...doc.data() } as Homework);
      });
      setHomeworkList(newHomeworkList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && targetClass && dueDate) {
      await addDoc(collection(db, "homework"), { title, description, class: targetClass, dueDate });
      setTitle("");
      setDescription("");
      setTargetClass("");
      setDueDate("");
    }
  };

  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage Homework</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddHomework} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Algebra Worksheet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Class</Label>
                <Input
                  id="class"
                  placeholder="e.g., CS 3A"
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
               <div className="grid gap-2 md:col-span-2 lg:col-span-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the assignment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add Homework</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assigned Homework</CardTitle>
            <CardDescription>
              A list of all homework assigned.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {homeworkList.length > 0 ? (
                  homeworkList.map((hw) => (
                    <TableRow key={hw.id}>
                      <TableCell>{hw.title}</TableCell>
                      <TableCell>{hw.class}</TableCell>
                       <TableCell>{hw.dueDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No homework assigned yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

