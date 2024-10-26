"use client";
import { useState } from "react";
import { CalendarDays, Plane } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for flight bookings
const flightBookings = [
  {
    id: 1,
    destination: "Paris, France",
    date: "2023-05-15",
    status: "Completed",
    flightNumber: "AF1234",
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    date: "2023-07-22",
    status: "Upcoming",
    flightNumber: "JL5678",
  },
  {
    id: 3,
    destination: "New York, USA",
    date: "2023-03-10",
    status: "Completed",
    flightNumber: "UA9012",
  },
  {
    id: 4,
    destination: "Sydney, Australia",
    date: "2023-09-05",
    status: "Cancelled",
    flightNumber: "QF3456",
  },
  {
    id: 5,
    destination: "London, UK",
    date: "2023-11-18",
    status: "Upcoming",
    flightNumber: "BA7890",
  },
];

export default function Component() {
  const [filter, setFilter] = useState("all");

  const filteredBookings = flightBookings.filter((booking) => {
    if (filter === "all") return true;

    return booking.status.toLowerCase() === filter;
  });

  return (
    <div className="max-w container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Flight Booking History
          </CardTitle>
          <CardDescription>
            View and manage your past and upcoming flights
          </CardDescription>
          <div className="mt-4">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
                  <div className="mb-2 flex items-center sm:mb-0">
                    <Plane className="mr-2 size-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{booking.destination}</h3>
                      <p className="text-sm text-muted-foreground">
                        Flight {booking.flightNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-1 size-4 text-muted-foreground" />
                    <span className="text-sm">{booking.date}</span>
                  </div>
                  <Badge
                    variant={
                      booking.status === "Completed"
                        ? "default"
                        : booking.status === "Upcoming"
                          ? "secondary"
                          : "destructive"
                    }
                    className="mt-2 sm:mt-0"
                  >
                    {booking.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
