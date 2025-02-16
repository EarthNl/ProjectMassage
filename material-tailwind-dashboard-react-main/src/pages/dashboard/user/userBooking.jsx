import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Rating,
  CardFooter, Dialog, Input, Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";


export function UserBooking() {
  
  return (
    <>
      <section className="bg-white px-4 pb-20 pt-4">
       <Card>
        <CardBody>
          <Typography>
            test UserBooking
          </Typography>
        </CardBody>
       </Card>
      </section>

      
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default UserBooking;
