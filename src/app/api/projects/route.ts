import z from "zod";
import { ProjectsSchema } from "../types/schemas";
import connectToDb from "../lib/db";
import Project from "../lib/models/project.model";

export type ProjectType = z.infer<typeof ProjectsSchema>;

export async function GET() {
  await connectToDb();
  const projects = await Project.find({});
  return Response.json(projects.reverse(), { status: 200 });
}

export async function POST(request: Request) {
  const projects = await request.json();
  const parsed = ProjectsSchema.safeParse(projects);

  if (!parsed.success)
    return Response.json({ message: "Invalid project data." }, { status: 400 });

  await connectToDb();
  const newProject = await Project.create(parsed.data);

  return Response.json(
    { message: "Project created successfully.", project: newProject },
    { status: 201 }
  );
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await connectToDb();

  const deletedProject = await Project.findOneAndDelete({ _id: id });
  if (!deletedProject)
    return Response.json({ message: "Project not found" }, { status: 404 });

  return Response.json(
    { message: "Project deleted successfully" },
    { status: 200 }
  );
}

export async function PUT(request: Request) {
  const projectData = await request.json();
  const parsed = ProjectsSchema.safeParse(projectData);
  
  if (!parsed.success)
    return Response.json({ message: "Invalid project data." }, { status: 400 });
  await connectToDb();

  const updatedProject = await Project.findOneAndUpdate(
    { _id: projectData._id },
    parsed.data,
    { new: true }
  );
  if (!updatedProject)
    return Response.json({ message: "Project not found" }, { status: 404 });

  return Response.json(
    { message: "Project updated successfully.", project: updatedProject },
    { status: 200 }
  );
}
