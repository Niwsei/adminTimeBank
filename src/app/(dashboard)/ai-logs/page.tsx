import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Activity, CheckCircle2 } from "lucide-react"

const logs = [
  {
    requester: "สมชาย ใจดี",
    requesterId: "U001",
    age: "45 ปี",
    requestType: "ซ่อมบ้าง",
    requestDetail: "ต้องการคนซ่อมแอร์บ้าน",
    provider: "วชิร ช่างแอร์",
    providerId: "P001",
    rating: "4.8⭐",
    date: "20 ธ.ค. 2024",
    matchScore: "94.0%",
    confidence: "confidence: high",
    status: "success",
  },
  {
    requester: "สุภาดา ศรีสุข",
    requesterId: "U002",
    age: "67 ปี",
    requestType: "ดูแล",
    requestDetail: "ต้องการคนช่วยดูแลผู้สูงอายุ",
    provider: "ประนอม มีสุข",
    providerId: "P002",
    rating: "4.9⭐",
    date: "21 ธ.ค. 2024",
    matchScore: "88.5%",
    confidence: "confidence: high",
    status: "success",
  },
  {
    requester: "วิไล สวยงาม",
    requesterId: "U006",
    age: "43 ปี",
    requestType: "การศึกษา",
    requestDetail: "สอนภาษาอังกฤษเด็ก",
    provider: "ธนา เรียนดี",
    providerId: "P007",
    rating: "4.7⭐",
    date: "19 ธ.ค. 2024",
    matchScore: "91.2%",
    confidence: "confidence: high",
    status: "success",
  },
  {
    requester: "วชิร รักดี",
    requesterId: "U003",
    age: "38 ปี",
    requestType: "เทคโนโลยี",
    requestDetail: "ซ่อมคอมพิวเตอร์",
    provider: "ธนา เรียนดี",
    providerId: "P007",
    rating: "4.7⭐",
    date: "18 ธ.ค. 2024",
    matchScore: "86.3%",
    confidence: "confidence: medium",
    status: "success",
  },
  {
    requester: "มานี ใจงาม",
    requesterId: "U008",
    age: "71 ปี",
    requestType: "ดูแล",
    requestDetail: "ช่วยทำสวนหน้าบ้าน",
    provider: "-",
    providerId: "-",
    rating: "-",
    date: "22 ธ.ค. 2024",
    matchScore: "45.8%",
    confidence: "confidence: low",
    status: "failed",
  },
  {
    requester: "สมศักดิ์ ช่างไม้",
    requesterId: "U005",
    age: "60 ปี",
    requestType: "ซ่อมแซม",
    requestDetail: "ซ่อมเฟอร์นิเจอร์",
    provider: "วชิร รักดี",
    providerId: "P003",
    rating: "4.6⭐",
    date: "17 ธ.ค. 2024",
    matchScore: "79.7%",
    confidence: "confidence: medium",
    status: "success",
  },
]

export default function AILogsPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="h-8 w-8" />
            AI Matching Logs
          </h1>
          <p className="text-muted-foreground">ตรวจสอบบันทึกการรับคู่ระหว่างผู้ร้องขอและผู้ให้บริการด้วย AI Algorithm</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">ทั้งหมด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6</div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">matching attempts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">สำเร็จ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">4</div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">successful matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">ล้มเหลว</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">1</div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">failed matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">คะแนนเฉลี่ย</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">85.7%</div>
              <p className="text-xs text-muted-foreground mt-1 font-mono">avg matching score</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>ค้นหาและกรองข้อมูล</CardTitle>
            <CardDescription>filter logs by requester/provider names, status, and date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="ชื่อผู้ร้องขอ หรือ ผู้ให้บริการ..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="สถานะการรับคู่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="success">สำเร็จ</SelectItem>
                  <SelectItem value="failed">ล้มเหลว</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="date" placeholder="วันที่เริ่มต้น" className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Matching Logs (6 รายการ)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้ร้องขอ</TableHead>
                  <TableHead>ชื่อความคำขอ</TableHead>
                  <TableHead>ผู้ให้บริการ</TableHead>
                  <TableHead>เวลารับคู่</TableHead>
                  <TableHead>Match Score</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                          {log.requester.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{log.requester}</div>
                          <div className="text-xs text-muted-foreground">
                            ID: {log.requesterId} • Age: {log.age}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.requestType}</div>
                        <div className="text-xs text-muted-foreground">{log.requestDetail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="font-medium">{log.provider}</div>
                          <div className="text-xs text-muted-foreground">
                            ID: {log.providerId} • Rating: {log.rating}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{log.matchScore}</div>
                        <div className="text-xs text-muted-foreground font-mono">{log.confidence}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          log.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100 gap-1"
                            : "bg-red-100 text-red-700 hover:bg-red-100 gap-1"
                        }
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {log.status === "success" ? "สำเร็จ" : "ล้มเหลว"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
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
