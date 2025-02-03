import {
  Card,
  CardBody,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";

export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Admin Name
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Admin
                </Typography>
              </div>
            </div>
           
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="หน้าที่ของผู้ดูแลระบบ"
              description="ผู้ดูแลระบบ (Admin) มีบทบาทสำคัญในการจัดการและดูแลระบบจองคิวให้มีประสิทธิภาพและตอบสนองความต้องการของผู้ใช้งาน โดยหน้าที่หลักของ ผู้ดูแลระบบ ประกอบไปด้วยการจัดการข้อมูลบริการ เช่น เพิ่ม แก้ไข และลบบริการที่ให้ลูกค้าเลือกจอง นอกจากนี้ยังมีหน้าที่จัดการข้อมูลพนักงาน เช่น เพิ่มข้อมูลพนักงานใหม่ อัปเดตรูปภาพ หรือกำหนดเวลาทำงานของพนักงานเพื่อให้สอดคล้องกับการจองคิวของลูกค้า ผู้ดูแลระบบ ยังต้องดูแลการจัดการข้อมูลการจอง เช่น ตรวจสอบ ยืนยัน หรือยกเลิกการจอง รวมถึงการจัดการระบบผู้ใช้งานเพื่อรักษาความปลอดภัยและความเสถียรของระบบ ในภาพรวม Admin ทำหน้าที่บริหารจัดการข้อมูลทั้งหมดของระบบ เพื่อให้การดำเนินงานเป็นไปอย่างราบรื่นและสร้างประสบการณ์ที่ดีให้กับลูกค้า"
              details={{
                "ชื่อ-นามสกุล": "Admin Name",
                "เบอร์โทรศัพท์": "08X-XXXXXXX",
                "อีเมล": "admin@mail.com",
                "บทบาท": "Admin",
              }}
            />
           
          </div>
        
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
