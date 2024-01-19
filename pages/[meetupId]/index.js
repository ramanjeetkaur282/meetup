import MeetupDetails from "../../components/meetups/MeetupDetails.js";
import { MongoClient,ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head.js";

function MeetupDetailsPage(props){
 return (
    <Fragment>
        <Head>
           <title>{props.meetupData.title}</title>
           <meta name="description"
           content={props.meetupData.description}/>
        </Head>
        <MeetupDetails 
   image= {props.meetupData.image}
   title={props.meetupData.title}
   address= {props.meetupData.address}
   description={props.meetupData.description}
   />
    </Fragment>      
       
  
 )
}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://ramanjeetkaur282:Eh4gkYv9ge6NehKo@nextjs.ljldfad.mongodb.net/meetups?retryWrites=true&w=majority');
    const db=client.db();

    const meetupsCollection=db.collection('meetups');
    const meetups=await meetupsCollection.find({},{_id:1}).toArray();

    client.close();
    return {
        fallback: false,
        paths: meetups.map((meetup)=>({
            params:{
                meetupId:meetup._id.toString()
            },
        }))
    }
}


export async function getStaticProps(context){
    const meetupId=context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://ramanjeetkaur282:Eh4gkYv9ge6NehKo@nextjs.ljldfad.mongodb.net/meetups?retryWrites=true&w=majority');
    const db=client.db();

    const meetupsCollection=db.collection('meetups');
    
    const selectedMeetup=await meetupsCollection.findOne({
        _id:new ObjectId(meetupId),
    });

    client.close();


     return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.title,
                address:selectedMeetup.address,
                image:selectedMeetup.image,
                description:selectedMeetup.description,
            }
        }
     }
}

export  default MeetupDetailsPage;