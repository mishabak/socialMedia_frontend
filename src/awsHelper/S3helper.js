import React from 'react'
import aws from 'aws-sdk'
import crypto,{ randomBytes } from 'crypto'
import env from "react-dotenv";

const region = 'ap-south-1'
const bucketName = 'socialmedia-react-project'
const accessKeyId = env.AWS_ACCESS_KEY_ID
const secretAccessKey = env.AWS_SECRET_ACCESS_KEY
// AKIA4Q5FEDDKFDA4B3DR
// GYUXe3q4j11/Z+Wh9XT1RmBAT8EKkCzULSyRQH9o
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'v4'
})
export async function generateUploadURL(){
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params =({
        Bucket:bucketName,
        Key:imageName,
        // Expires:60
    })

    const uploadURL = s3.getSignedUrlPromise('putObject',params)
    
    return uploadURL
}

export async function deleteUploadedFILE(){
    s3.deleteObject({Bucket:bucketName,Key:'2e8014b0354965380cc8109aefff799c'}).promise()
}
