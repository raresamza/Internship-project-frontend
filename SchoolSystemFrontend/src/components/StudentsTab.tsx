import Navbar from './Navbar'
import { useState, useEffect } from 'react'
import Student from './Student'

// import UserService from '../service/UserService'
// import { useCookies } from 'react-cookie';

// import raton from '../../public/raton.jpeg'
// C:\Users\rares\Desktop\last-repo\public\WhatsApp Image 2023-03-10 at 20.12.17.jpeg

const StudentsTab = () => {

    //   const [cookies] = useCookies(['cookie-name']);


    // !!!!change is loading back to true when developing
    const [loading, setLoading] = useState<boolean>(true);

    const [students, setStudents] = useState<Student[]>([]);

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       setLaoding(true);
    //       try {
    //         const students = await UserService.getStudentsBase(cookies.jwt);
    //         console.log(students.data);
    //         setStudents(students.data)
    //       } catch (err) {
    //         console.log(err)
    //       }
    //       setLaoding(false);
    //     };
    //     fetchData();
    //   }, []);


    interface Student {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
      }

      useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
          setStudents([
            { id: 1, firstName: 'Rares', lastName: 'Amza', email: 'raresamza@gmail.com' },
            { id: 2, firstName: 'John', lastName: 'Doe', email: 'johndoe@gmail.com' },
            { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'janesmith@gmail.com' }
          ]);
          setLoading(false);
        }, 1000);
      }, []);

    return (
        <>
            <Navbar></Navbar>
            <p className='px-20 text-4xl font-bold py-10'>Students:</p>
            <div className='px-20 py-6'>
                <table className='border-separate border-spacing-y-6'>
                {!loading && (
            <tbody>
              {students.map((student) => (
                <Student
                  key={student.id}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  email={student.email}
                />
              ))}
            </tbody>
          )}
        </table>
            </div>
        </>
    )
}

export default StudentsTab

