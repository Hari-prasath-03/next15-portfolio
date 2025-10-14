import z from "zod";
import { ExperienceSchems } from "../types/schemas";
import { MultiRecordDb } from "../lib/jsondb";

type ExperienceType = z.infer<typeof ExperienceSchems>;

const db = new MultiRecordDb<ExperienceType>("experiences");

export async function GET() {
  const experiences = (await db.readAll()) as ExperienceType[];
  return Response.json(
    experiences.sort((a, b) => ((b.id as number) - (a.id as number))),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const experience = await request.json();
  const parsed = z.array(ExperienceSchems).safeParse(experience);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid experience data." },
      { status: 400 }
    );
  }

  await db.addMany(parsed.data);
  return Response.json(
    { message: "Experience created successfully." },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const experience = await request.json();
  const parsed = ExperienceSchems.safeParse(experience);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid experience data." },
      { status: 400 }
    );
  }

  const isUpdated = await db.updateOne(parsed.data.id as number, parsed.data);
  return Response.json(
    {
      message: isUpdated
        ? "Experience updated successfully."
        : "Experience not found.",
    },
    { status: isUpdated ? 200 : 404 }
  );
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const isDeleted = await db.deleteOne(id);
  return Response.json(
    { message: isDeleted ? "Experience deleted." : "Experience not found." },
    { status: isDeleted ? 200 : 404 }
  );
}
