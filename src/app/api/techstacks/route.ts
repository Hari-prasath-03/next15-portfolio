import z from "zod";
import { MultiRecordDb } from "../lib/jsondb";
import { TechStackSchema } from "../types/schemas";

type TechStackType = z.infer<typeof TechStackSchema>;

const db = new MultiRecordDb<TechStackType>("techstacks");

export async function GET() {
  const techStacks = (await db.readAll()) as TechStackType[];
  const tabs = Array.from(new Set(techStacks.map((t) => t.category)));
  return Response.json({ techStacks, tabs }, { status: 200 });
}

export async function POST(request: Request) {
  const techStack = await request.json();

  const parsed = z.array(TechStackSchema).safeParse(techStack);
  if (!parsed.success) {
    return Response.json(
      { message: "Invalid tech stack data." },
      { status: 400 }
    );
  }

  await db.addMany(parsed.data);
  return Response.json(
    { message: "Tech stack added successfully." },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const techStack = await request.json();
  const parsed = TechStackSchema.safeParse(techStack);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid tech stack data." },
      { status: 400 }
    );
  }

  const isUpdated = await db.updateOne(parsed.data.id as number, parsed.data);
  return Response.json(
    { message: isUpdated ? "Tech stack updated successfully." : "Tech stack not found." },
    { status: isUpdated ? 200 : 404 }
  );
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const isDeleted = await db.deleteOne(id);
  return Response.json(
    { message: isDeleted ? "Tech stack deleted." : "Tech stack not found." },
    { status: isDeleted ? 200 : 404 }
  );
}
