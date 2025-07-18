import { UserSearch } from "./user-search"
import { UserCategoryFilters } from "./user-category-filters"
import { UserHealthcareResults } from "./user-healthcare-results"

interface UserBookAppointmentProps {
  onHospitalSelect: (hospital: any) => void
  onNavigate: (view: string) => void
}

export function UserBookAppointment({ onHospitalSelect, onNavigate }: UserBookAppointmentProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <UserSearch />
      <UserCategoryFilters />
      <UserHealthcareResults onHospitalSelect={onHospitalSelect} />
    </div>
  )
}
