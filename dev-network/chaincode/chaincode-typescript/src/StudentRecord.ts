
import { Context, Contract } from 'fabric-contract-api';
import { Student } from './Student';

export class StudentRecord extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        const student: Student[] = [
            {
                roll_no: '123',
                name: 'Shyam',
                marks: '500'
            },
            {
                roll_no: '12345',
                name: 'Mohan',
                marks: '400'
            }
        ];

        for (let i = 0; i < student.length; i++) {
            await ctx.stub.putState(student[i].roll_no, Buffer.from(JSON.stringify(student[i])));
            console.info('Added <--> ', student[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    public async updateMarks(ctx: Context, studentRollNumber: string, newMarks: string) {

        const studentAsBytes = await ctx.stub.getState(studentRollNumber); // get the student from chaincode state
        if (!studentAsBytes || studentAsBytes.length === 0) {
            throw new Error(`${studentRollNumber} does not exist`);
        }
        const student: Student = JSON.parse(studentAsBytes.toString());
        student.marks = newMarks;

        await ctx.stub.putState(studentRollNumber, Buffer.from(JSON.stringify(student)));

    }

}
