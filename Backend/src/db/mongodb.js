import moongose from 'mongoose';
async function connectDB(){
    try {
        console.log(" database uri")
        const connection = await moongose.connect(`${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`)
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error while Connecting the database",error);
    }
}
export {connectDB}