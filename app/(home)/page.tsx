import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Users Table</h1>
      <Table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">ID</TableHead>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Email</TableHead>
            <TableHead className="px-4 py-2">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className="border-t">
              <TableCell className="px-4 py-2">{user.id}</TableCell>
              <TableCell className="px-4 py-2">{user.name}</TableCell>
              <TableCell className="px-4 py-2">{user.email}</TableCell>
              <TableCell className="px-4 py-2">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
