
import Questions from '../models/Questions.js'
import mongoose from 'mongoose'



export const AskQuestion = async (req,res)=>{
     const postQuestionData = req.body;
     const userId = req.userId;
     const postQuestion = new Questions ({...postQuestionData})
     try {
        await postQuestion.save();
        res.status(200).json("Posted a question succesfully")
     } catch (error) {
         console.log(error)
         res.status(409).json("Couldn't post a new question")
     }
 }
 export const getAllQuestions = async (req,res)=>{
    try {
        const questionList = await Questions.find()
        res.status(200).json(questionList)
    } catch (error) {
        res.status(404).json({meaasge:error.message})
    }
 }
export const deleteQuestion = async (req,res)=>{
    const { id:_id } =req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    try {
        await Questions.findByIdAndRemove(_id)
        res.status(200).json({message : "Successfully deleted..."})
    } catch (error) {
        res.status(404).json({ message:error.messsage })
    }
}
 export const voteQuestion = async(req,res)=>{
    const {id:_id} =req.params;
    const {value,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...')
    }
    try {
        const question=await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id)=>id=== String(userId))
        const downIndex = question.downVote.findIndex((id)=>id=== String(userId))
        
        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote=question.downVote.filter((id)=>id !==String(userId))
            }
            if(upIndex === -1){
                question.upVote.push(userId)
            }else{
                question.upVote= question.upVote.filter((id)=>id !== String(userId))
            }
        }
        else if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote=question.upVote.filter((id)=>id !==String(userId))
            }
            if(downIndex === -1){
                question.downVote.push(userId)
            }else{
                question.downVote= question.downVote.filter((id)=>id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message:"Voted successfully"})
    } catch (error) {
        res.status(404).json({message:"id not found"})
    }
 }
 export const askedQuestions = async(req,res)=>{
    try {
        const {id :_id} = req.params;
        const today = new Date();
        today.setUTCHours(0,0,0,0);
        const questionCount = await Questions.countDocuments({userId: _id,askedOn :{$gte:today}})
        console.log(questionCount)
        res.status(200).json(questionCount)
    } catch (error) {
        console.log(error)
    }
 }