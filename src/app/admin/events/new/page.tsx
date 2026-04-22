import { AdminFrame } from "@/components/admin-frame";
import { EventCreationForm } from "@/components/event-creation-form";

export default function AdminNewEventPage() {
  return (
    <AdminFrame>
      <EventCreationForm />
    </AdminFrame>
  );
}
