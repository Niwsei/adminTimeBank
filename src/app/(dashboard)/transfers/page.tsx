import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Download } from "lucide-react"
import { transfers } from "@/data/transfers"

export default function TransfersPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">การโอนเครดิตระหว่างสมาชก</h1>
          <p className="text-muted-foreground">ติดตามและตรวจสอบการโอนเครดิตทั้งหมดในระบบ</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">การโอนทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">รายการ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">เครดิตรวม</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">29</div>
              <p className="text-xs text-muted-foreground mt-1">ชั่วโมง</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">อัตราสำเร็จ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">75%</div>
              <p className="text-xs text-muted-foreground mt-1">การโอนสำเร็จ</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>ตัวกรองข้อมูล</CardTitle>
            <CardDescription>กรองข้อมูลการโอนตามเงื่อนไขต่างๆ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" placeholder="วันที่เริ่มต้น" className="pl-10" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" placeholder="วันที่สิ้นสุด" className="pl-10" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="ค้นหาผู้โอน..." className="pl-10" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="ค้นหาผู้รับ..." className="pl-10" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                ส่งออก CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transfers Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายการโอนเครดิต (8 รายการ)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>ผู้โอน</TableHead>
                  <TableHead>ผู้รับ</TableHead>
                  <TableHead>จำนวนเครดิต</TableHead>
                  <TableHead>เวลาที่โอน</TableHead>
                  <TableHead>หมายเหตุ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ประเภท</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                  <TableRow key={transfer.id}>
                    <TableCell className="font-medium">{transfer.id}</TableCell>
                    <TableCell>{transfer.sender}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <span>→</span>
                      {transfer.receiver}
                    </TableCell>
                    <TableCell className="text-blue-600 font-semibold">{transfer.amount}</TableCell>
                    <TableCell>{transfer.date}</TableCell>
                    <TableCell className="max-w-[200px]">{transfer.reason}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">สำเร็จ</Badge>
                    </TableCell>
                    <TableCell>{transfer.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  )
}
