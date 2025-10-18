import connectToDb from "../lib/db";
import About from "../lib/models/about.model";
import { AboutSchema } from "../types/schemas";

export async function GET() {
  // console.log(request.headers.get("authorization"));
  await connectToDb();
  const about = await About.findOne().lean();
  return Response.json(about, { status: 200 });
}

export async function POST(request: Request) {
  const about = await request.json();
  const parsed = AboutSchema.safeParse(about);

  if (!parsed.success)
    return Response.json(
      { message: "Invalid about information." },
      { status: 400 }
    );

  await connectToDb();
  await About.create(about);

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

  await connectToDb();
  const existingAbout = await About.findOne();

  if (!existingAbout)
    return Response.json(
      { message: "About information not found." },
      { status: 404 }
    );

  const newAbout = {
    name: about.name,
    role: about.role,
    description: about.description,
    contents: about.contents,
  };

  await About.updateOne({ _id: existingAbout._id }, newAbout);

  return Response.json(
    { message: "About information updated successfully." },
    { status: 200 }
  );
}
