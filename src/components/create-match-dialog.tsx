'use client'

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
}

type CreateMatchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobId?: string
}

export function CreateMatchDialog({ open, onOpenChange, jobId }: CreateMatchDialogProps) {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>()
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/admin/users-with-line-id`, {
            credentials: "include",
          })
          const payload = await response.json()
          if (!response.ok || !payload.success) {
            throw new Error(payload.message || "Failed to fetch users")
          }
          setUsers(payload.users)
        } catch (error: any) {
          toast({
            title: "เกิดข้อผิดพลาด",
            description: error.message || "ไม่สามารถดึงข้อมูลผู้ใช้ได้",
            variant: "destructive",
          })
        }
      }
      fetchUsers()
    }
  }, [open, toast])

  const handleSubmit = async () => {
    if (!jobId || !selectedUserId) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "โปรดเลือกงานและผู้ใช้",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/admin/matches`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id: jobId, user_id: selectedUserId, reason }),
      })

      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Failed to create match")
      }

      toast({
        title: "สร้างการจับคู่สำเร็จ",
        description: `จับคู่งานกับผู้ใช้เรียบร้อยแล้ว`,
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถสร้างการจับคู่ได้",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างการจับคู่ใหม่</DialogTitle>
          <DialogDescription>จับคู่งานกับสมาชิกที่มี LINE ID</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="jobId">รหัสงาน</label>
            <Input id="jobId" value={jobId} disabled />
          </div>
          <div>
            <label htmlFor="userId">เลือกผู้ใช้</label>
            <Select onValueChange={setSelectedUserId} value={selectedUserId}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกผู้ใช้..." />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="reason">เหตุผล (ไม่บังคับ)</label>
            <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            ยกเลิก
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
