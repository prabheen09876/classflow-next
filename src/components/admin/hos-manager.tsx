
"use client";

import { useState, useEffect } from "react";
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

export function HosManager() {
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
      // For simplicity, we just add to profiles.
      // A real app would have a more complex user invitation flow.
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
    <div className="space-y-8">
       <div>
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
       </div>
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
    </div>
  );
}
