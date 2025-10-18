import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, MoreVertical } from "lucide-react"
import { members } from "@/data/members"

export default function MembersPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">สมาชิกทั้งหมด</h1>
          <p className="text-muted-foreground">จัดการข้อมูลสมาชิกในระบบ Time Bank (ทั้งหมด 8 คน)</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
            <CardDescription>ค้นหาสมาชิกตามชื่อหรือชื่อหรือจังหวัด และใช้ตัวกรองเพื่อจำกัดผลลัพธ์</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="ค้นหาตามชื่อสมาชิกหรือจังหวัด..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                แสดงทั้งหมด
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายชื่อสมาชิก (8 คน)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อสมาชิก</TableHead>
                  <TableHead>อายุ</TableHead>
                  <TableHead>จังหวัด</TableHead>
                  <TableHead>เครดิตคงเหลือ</TableHead>
                  <TableHead>ความสามารถ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.age}</TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell className="text-blue-600 font-medium">{member.credits}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="text-sm">{member.skills}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={member.status === "active" ? "default" : "secondary"}
                        className={
                          member.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {member.status === "active" ? "ใช้งาน" : "ใกล้หมด"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                          ดูรายละเอียด
                        </Button>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  )
}
