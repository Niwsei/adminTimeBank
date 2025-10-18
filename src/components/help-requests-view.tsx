'use client'

import { useMemo, useState } from "react"
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Users,
  Eye,
  X,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  TrendingUp,
  Activity,
  LinkIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

const requests = [
  {
    id: 1,
    requester: {
      name: "สมชาย ใจดี",
      age: 67,
      credits: 5,
      category: "พาไปโรงพยาบาล",
    },
    detail: {
      title: "ต้องการคนช่วยพาไปโรงพยาบาลเช่าวัน พรุ่งนี้ มีนัดหมายแพทย์ แต่ไม่มีรถ อยาก ได้คนช่วยขับรถไปส่ง",
      duration: 3,
    },
    location: {
      city: "เชตบางรัก",
      district: "กรุงเทพฯ",
    },
    date: "20 ธ.ค. 2024",
    time: "08:30 น.",
    status: "urgent",
    borderColor: "border-l-red-500",
  },
  {
    id: 2,
    requester: {
      name: "สุภาดา ศรีสุข",
      age: 45,
      credits: 12,
      category: "ทำความสะอาด",
    },
    detail: {
      title: "อยากได้คนมาทำความสะอาดบ้าน เพราะ จะมีแขกมาเยี่ยม วันเสาร์นี้ ช่วยกวาดถู เช็ดฝุ่น",
      duration: 4,
    },
    location: {
      city: "เขตคลองเมือง",
      district: "กรุงเทพฯ",
    },
    date: "19 ธ.ค. 2024",
    time: "14:20 น.",
    status: "pending",
    borderColor: "border-l-yellow-500",
  },
  {
    id: 3,
    requester: {
      name: "วชิร รักดี",
      age: 52,
      credits: 8,
      category: "ซ่อมบำรุง",
    },
    detail: {
      title: "ต้องการคนช่วยซ่อมก๊อกน้ำที่ห้องครัว เปิดแล้วน้ำไม่ออก และมีเสียงแปลกๆ",
      duration: 2,
    },
    location: {
      city: "เมืองขอนแก่น",
      district: "ขอนแก่น",
    },
    date: "19 ธ.ค. 2024",
    time: "10:15 น.",
    status: "matched",
    borderColor: "border-l-green-500",
  },
  {
    id: 4,
    requester: {
      name: "มาลี ขยัน",
      age: 38,
      credits: 15,
      category: "ดูแลผู้สูงอายุ",
    },
    detail: {
      title: "ขอคนช่วยดูแลคุณแม่ที่มีอายุมาก เวลาที่ ต้องไปทำงาน ช่วยให้ยา ดูแลอาหาร",
      duration: 6,
    },
    location: {
      city: "เมืองภูเก็ต",
      district: "ภูเก็ต",
    },
    date: "18 ธ.ค. 2024",
    time: "16:45 น.",
    status: "urgent",
    borderColor: "border-l-red-500",
  },
  {
    id: 5,
    requester: {
      name: "ประนอม มีสุข",
      age: 55,
      credits: 10,
      category: "ซ่อมแซม",
    },
    detail: {
      title: "ต้องการช่างซ่อมประตูบ้านที่เสีย ปิดไม่สนิท มีเสียงดัง",
      duration: 3,
    },
    location: {
      city: "เมืองเชียงใหม่",
      district: "เชียงใหม่",
    },
    date: "18 ธ.ค. 2024",
    time: "09:30 น.",
    status: "pending",
    borderColor: "border-l-yellow-500",
  },
  {
    id: 6,
    requester: {
      name: "สมศักดิ์ ช่างไม้",
      age: 60,
      credits: 7,
      category: "การศึกษา",
    },
    detail: {
      title: "ต้องการคนสอนใช้สมาร์ทโฟนและแอปพลิเคชันต่างๆ",
      duration: 2,
    },
    location: {
      city: "เมืองนครราชสีมา",
      district: "นครราชสีมา",
    },
    date: "17 ธ.ค. 2024",
    time: "13:00 น.",
    status: "matched",
    borderColor: "border-l-green-500",
  },
  {
    id: 7,
    requester: {
      name: "วิไล สวยงาม",
      age: 42,
      credits: 9,
      category: "ทำสวน",
    },
    detail: {
      title: "ต้องการคนช่วยตัดแต่งต้นไม้ในสวน และรดน้ำต้นไม้",
      duration: 4,
    },
    location: {
      city: "เมืองสุราษฎร์ธานี",
      district: "สุราษฎร์ธานี",
    },
    date: "17 ธ.ค. 2024",
    time: "08:00 น.",
    status: "pending",
    borderColor: "border-l-yellow-500",
  },
]

const categoryOptions = [
  { value: "all", label: "ทุกประเภท" },
  { value: "พาไปโรงพยาบาล", label: "พาไปโรงพยาบาล" },
  { value: "ทำความสะอาด", label: "ทำความสะอาด" },
  { value: "ซ่อมบำรุง", label: "ซ่อมบำรุง" },
  { value: "ดูแลผู้สูงอายุ", label: "ดูแลผู้สูงอายุ" },
  { value: "ทำสวน", label: "ทำสวน" },
]

const statusOptions = [
  { value: "all", label: "ทุกสถานะ" },
  { value: "urgent", label: "เร่งด่วน" },
  { value: "pending", label: "รอดำเนินการ" },
  { value: "matched", label: "จับคู่แล้ว" },
]

export function HelpRequestsView() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<(typeof requests)[0] | null>(null)
  const [cancelRequest, setCancelRequest] = useState<(typeof requests)[0] | null>(null)
  const [matchRequest, setMatchRequest] = useState<(typeof requests)[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [isMatchOpen, setIsMatchOpen] = useState(false)

  const filteredRequests = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return requests.filter((request) => {
      const matchesSearch =
        !normalizedQuery ||
        request.requester.name.toLowerCase().includes(normalizedQuery) ||
        request.detail.title.toLowerCase().includes(normalizedQuery)

      const matchesCategory =
        categoryFilter === "all" ||
        request.requester.category.toLowerCase().includes(categoryFilter.toLowerCase())

      const matchesStatus = statusFilter === "all" || request.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchQuery, categoryFilter, statusFilter])

  const stats = useMemo(
    () => ({
      total: filteredRequests.length,
      urgent: filteredRequests.filter((r) => r.status === "urgent").length,
      pending: filteredRequests.filter((r) => r.status === "pending").length,
      matched: filteredRequests.filter((r) => r.status === "matched").length,
    }),
    [filteredRequests],
  )

  const handleViewDetails = (request: (typeof requests)[0]) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const handleCancelClick = (request: (typeof requests)[0]) => {
    setCancelRequest(request)
    setIsCancelOpen(true)
  }

  const handleCancelConfirm = () => {
    if (!cancelRequest) return

    toast({
      title: "ยกเลิกคำขอสำเร็จ",
      description: `คำขอของ ${cancelRequest.requester.name} ถูกยกเลิกแล้ว`,
      variant: "default",
    })
    setIsCancelOpen(false)
    setCancelRequest(null)
  }

  const handleMatchClick = (request: (typeof requests)[0]) => {
    setMatchRequest(request)
    setIsMatchOpen(true)
  }

  const handleMatchConfirm = () => {
    if (!matchRequest) return

    toast({
      title: "เริ่มกระบวนการจับคู่",
      description: `กำลังค้นหาผู้ให้บริการที่เหมาะสมสำหรับ ${matchRequest.requester.name}`,
      variant: "default",
    })
    setIsMatchOpen(false)
    setMatchRequest(null)
  }

  return (
    <>
      <div className="space-y-8 overflow-x-hidden">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance">คำขอความช่วยเหลือ</h1>
          <p className="text-lg text-muted-foreground">ตรวจสอบและจัดการคำขอความช่วยเหลือจากสมาชิกในระบบ</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="ทั้งหมด"
            value={stats.total}
            icon={<Activity className="h-5 w-5" />}
            description="คำขอทั้งหมดในระบบ"
            className="stat-card-total"
          />
          <StatCard
            title="เร่งด่วน"
            value={stats.urgent}
            icon={<AlertTriangle className="h-5 w-5" />}
            description="ต้องจัดการด่วน"
            className="stat-card-urgent"
          />
          <StatCard
            title="รอจับคู่"
            value={stats.pending}
            icon={<Clock className="h-5 w-5" />}
            description="รอการหาผู้ให้บริการ"
            className="stat-card-pending"
          />
          <StatCard
            title="จับคู่แล้ว"
            value={stats.matched}
            icon={<CheckCircle2 className="h-5 w-5" />}
            description="พร้อมสำหรับการบริการ"
            className="stat-card-matched"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ค้นหาและกรองคำขอ</CardTitle>
            <CardDescription>ค้นหาคำขอและใช้ตัวกรองเพื่อจัดการคำขอได้ง่ายขึ้น</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหา..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="ประเภทบริการ" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full gap-2 lg:w-auto">
                <Filter className="h-4 w-4" />
                ตัวกรองเพิ่มเติม
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>รายการคำขอทั้งหมด</CardTitle>
            <CardDescription>แสดงรายการคำขอความช่วยเหลือทั้งหมดในระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้ขอ</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>สถานที่</TableHead>
                  <TableHead>วันที่/เวลา</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleViewDetails(request)}
                      data-state={request.id === selectedRequest?.id && 'selected'}
                    >
                      <TableCell>
                        <div className="font-medium">{request.requester.name}</div>
                        <div className="text-sm text-muted-foreground">อายุ {request.requester.age} ปี</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{request.requester.category}</div>
                        <div className="text-sm text-muted-foreground max-w-[300px] truncate">
                          {request.detail.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{request.location.city}</div>
                        <div className="text-sm text-muted-foreground">{request.location.district}</div>
                      </TableCell>
                      <TableCell>
                        <div>{request.date}</div>
                        <div className="text-sm text-muted-foreground">{request.time}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "urgent"
                              ? "destructive"
                              : request.status === "pending"
                                ? "outline"
                                : "default"
                          }
                        >
                          {request.status === "urgent"
                            ? "เร่งด่วน"
                            : request.status === "pending"
                              ? "รอดำเนินการ"
                              : "จับคู่แล้ว"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleViewDetails(request); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={(e) => { e.stopPropagation(); handleMatchClick(request); }}>
                            จับคู่
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      ไม่พบข้อมูล
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>รายละเอียดคำขอ</DialogTitle>
            <DialogDescription>จัดการรายละเอียดคำขอและดำเนินการจับคู่</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex-1 rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedRequest.requester.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        อายุ {selectedRequest.requester.age} ปี • เครดิต {selectedRequest.requester.credits} ชั่วโมง
                      </p>
                    </div>
                    <Badge>{selectedRequest.requester.category}</Badge>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <p>รายละเอียด: {selectedRequest.detail.title}</p>
                    <p>เวลาที่ต้องการ: {selectedRequest.detail.duration} ชั่วโมง</p>
                    <p>
                      {selectedRequest.location.city}, {selectedRequest.location.district}
                    </p>
                    <p>
                      {selectedRequest.date} • {selectedRequest.time}
                    </p>
                  </div>
                </div>
                <div className="flex-1 rounded-lg border p-4">
                  <h3 className="text-lg font-semibold">ข้อมูลผู้ให้บริการที่เสนอ</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">จารุวรรณ ไหวพริบ</p>
                        <p className="text-sm text-muted-foreground">เครดิต 42 ชั่วโมง • ประสบการณ์ 5 ปี</p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <LinkIcon className="h-4 w-4" />
                        ตรวจสอบ
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">สมปอง มือทอง</p>
                        <p className="text-sm text-muted-foreground">เครดิต 12 ชั่วโมง • ประสบการณ์ 2 ปี</p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <LinkIcon className="h-4 w-4" />
                        ตรวจสอบ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="destructive" onClick={() => handleCancelClick(selectedRequest)}>
                  <X className="mr-2 h-4 w-4" />
                  ยกเลิกคำขอ
                </Button>
                <Button onClick={() => handleMatchClick(selectedRequest)}>จับคู่ทันที</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการยกเลิกคำขอ</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ที่จะยกเลิกคำขอของ <strong>{cancelRequest?.requester.name}</strong>? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm} className="bg-red-600 hover:bg-red-700">
              ยืนยันการยกเลิก
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isMatchOpen} onOpenChange={setIsMatchOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>เริ่มกระบวนการจับคู่</AlertDialogTitle>
            <AlertDialogDescription>
              ระบบจะเริ่มค้นหาผู้ให้บริการที่เหมาะสมสำหรับคำขอของ <strong>{matchRequest?.requester.name}</strong>
              <br />
              <br />
              ประเภท: {matchRequest?.requester.category}
              <br />
              ระยะเวลา: {matchRequest?.detail.duration} ชั่วโมง
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleMatchConfirm} className="bg-blue-600 hover:bg-blue-700">
              เริ่มจับคู่
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default HelpRequestsView
