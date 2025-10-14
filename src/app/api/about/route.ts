import { SingleRecordDb } from "../lib/jsondb";
import { AboutSchema } from "../types/schemas";
import z from "zod";

type AboutType = z.infer<typeof AboutSchema>;

const db = new SingleRecordDb<AboutType>("about");

export async function GET() {
  // console.log(request.headers.get("authorization"));
  const data = await db.readAll();
  return Response.json(data, { status: 200 });
}

export async function POST(request: Request) {
  const about = await request.json();
  const parsed = AboutSchema.safeParse(about);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid about information." },
      { status: 400 }
    );
  }

  await db.write(about);
  return Response.json(
    { message: "About information added successfully." },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const about = await request.json();
  const parsed = AboutSchema.safeParse(about);

  if (!parsed.success) {
    return Response.json(
      { message: "Invalid about information." },
      { status: 400 }
    );
  }

  await db.write(about);
  return Response.json(
    { message: "About information updated successfully." },
    { status: 200 }
  );
}
