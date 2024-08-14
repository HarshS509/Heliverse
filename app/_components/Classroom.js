function Classroom({ classrooms }) {
  return (
    <>
      <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Classroom Name</th>
            <th className="py-2 px-4 text-left">Teacher Name</th>
            <th className="py-2 px-4 text-left">Number of Students</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id} className="border-t border-gray-300">
              <td className="py-2 px-4">{classroom.name}</td>
              <td className="py-2 px-4">
                {`${classroom.teacher?.firstName || ""} ${
                  classroom.teacher?.lastName || ""
                }`.trim() || "NOT ASSIGNED"}
              </td>
              <td className="py-2 px-4">{classroom.students.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Classroom;
