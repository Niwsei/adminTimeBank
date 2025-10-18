import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, CheckCircle2, Clock, TrendingUp } from "lucide-react"

import { StatisticsChart } from "@/components/statistics-chart"

const statsData = [
  { month: "ม.ค.", requests: 40, matches: 35 },
  { month: "ก.พ.", requests: 52, matches: 45 },
  { month: "มี.ค.", requests: 48, matches: 42 },
  { month: "เม.ย.", requests: 61, matches: 55 },
  { month: "พ.ค.", requests: 55, matches: 52 },
  { month: "มิ.ย.", requests: 67, matches: 58 },
  { month: "ก.ค.", requests: 70, matches: 62 },
  { month: "ส.ค.", requests: 68, matches: 65 },
  { month: "ก.ย.", requests: 75, matches: 68 },
  { month: "ต.ค.", requests: 82, matches: 72 },
  { month: "พ.ย.", requests: 78, matches: 75 },
  { month: "ธ.ค.", requests: 90, matches: 78 },
]

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ภาพรวมระบบ</h1>
        <p className="text-muted-foreground">ติดตามและจัดการข้อมูลของระบบ Time Bank</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">สมาชิกทั้งหมด</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              +12% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">เครดิตทั้งหมดในระบบ</CardTitle>
            <CreditCard className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,847 ชม.</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              +8% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ภารกิจสำเร็จ</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              +23% จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">คำขอที่รอดำเนินการ</CardTitle>
            <Clock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">47</div>
            <p className="mt-1 text-xs text-muted-foreground">คำขอที่รอการจับคู่</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>การวิเคราะห์คำขอและการรับคู่</CardTitle>
          <CardDescription>แสดงจำนวนคำขอความช่วยเหลือและการรับคู่ที่สำเร็จในแต่ละเดือน</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="h-[400px] animate-pulse rounded-lg bg-muted" />}>
            <StatisticsChart data={statsData} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
