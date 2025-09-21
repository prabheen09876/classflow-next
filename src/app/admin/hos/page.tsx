
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase";

interface Hos {
  id: string;
  name: string;
  email: string;
}

export default function HosManagementPage() {
  const supabase = createClient();
  const [hosList, setHosList] = useState<Hos[]>([]);
  const [hosName, setHosName] = useState("");
  const [hosEmail, setHosEmail] = useState("");

  useEffect(() => {
    const fetchHos = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email')
        .eq('role', 'hos');
      
      if (data) {
        setHosList(data);
      }
    };
    fetchHos();
  }, [supabase]);

  const handleAddHos = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hosName && hosEmail) {
      // In a real app, you'd likely invite a user which creates an auth user
      // and then you'd assign a role. For simplicity, we add to profiles.
      // This won't create an actual Supabase auth user.
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ name: hosName, email: hosEmail, role: 'hos' }])
        .select();

      if (data) {
        setHosList([...hosList, ...data as Hos[]]);
      }
      setHosName("");
      setHosEmail("");
    }
  };

  return (
    <div className="flex flex-col">
       <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Manage HOS</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New HOS</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddHos} className="grid gap-4 md:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="hos-name">Name</Label>
                <Input
                  id="hos-name"
                  placeholder="John Doe"
                  value={hosName}
                  onChange={(e) => setHosName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hos-email">Email</Label>
                <Input
                  id="hos-email"
                  type="email"
                  placeholder="hos@example.com"
                  value={hosEmail}
                  onChange={(e) => setHosEmail(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit"><Plus className="mr-2 h-4 w-4" /> Add HOS</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>HOS List</CardTitle>
            <CardDescription>
              A list of all Heads of School.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosList.length > 0 ? (
                  hosList.map((hos) => (
                    <TableRow key={hos.id}>
                      <TableCell>{hos.name}</TableCell>
                      <TableCell>{hos.email}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No HOS added yet.
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
