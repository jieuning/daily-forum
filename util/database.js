import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://jieun:asdf1234@cluster0.in7j2zx.mongodb.net/?retryWrites=true&w=majority'
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
    // 코드가 여러번 실행된는 것을 방지
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }