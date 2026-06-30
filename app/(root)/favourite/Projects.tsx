import { Separator } from "@/components/ui/separator";

import { Star, DotSquare, EllipsisVerticalIcon } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    _id: "project1",
    name: "Project1",
    favourite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "project2",
    name: "Project2",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "project3",
    name: "Project3",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Projects = () => {
  return (
    <main className="space-y-2">
      <div className="space-y-2">
        <p className="pl-2">Projects</p>
        <Separator />
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="basis-10" />
        <p className="flex-1">Name</p>
        <p className="basis-40 flex justify-center">CreatedAt</p>
        <p className="basis-40 flex justify-center">UpdatedAt</p>
        <p className="basis-40 flex justify-end">Options</p>
      </div>
      <Separator />

      {projects.map((item) => {
        return (
          <div key={item._id}>
            <Link href={`/projects?id=${item._id}`}>
              <div className="flex justify-between items-center text-sm">
                <div className="basis-10 flex justify-center">
                  <Star size={16} fill={item.favourite ? "yellow" : "black"} />
                </div>
                <p className="flex-1 truncate">{item.name}</p>
                <p className="basis-40 flex justify-center">
                  {item.createdAt.toLocaleDateString()}
                </p>
                <p className="basis-40 flex justify-center">
                  {item.updatedAt.toLocaleDateString()}
                </p>
                <p className="basis-40 flex justify-end">
                  <EllipsisVerticalIcon />
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Projects;
