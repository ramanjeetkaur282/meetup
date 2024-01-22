import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head  from 'next/head';


function HomePage(props){
    return ( 
        <Fragment>
            <Head>
                <title> Meeting Point</title>
                <meta 
                name='description'
                content='Browse a huge list of highly active meetups'/>
            </Head>
             <MeetupList meetups={props.meetups}/>;
        </Fragment>            
    )
}

export async function getStaticProps(){

    const client = await MongoClient.connect('mongodb+srv://ramanjeetkaur282:Sandy123@nextjs.ljldfad.mongodb.net/meetups?retryWrites=true&w=majority');
    const db=client.db();

    const meetupsCollection=db.collection('meetups');

    const meetups=await meetupsCollection.find().toArray();
    client.close();
    return {
        props:{
        meetups: meetups.map((meetup)=>({
            title:meetup.title,
            address:meetup.address,
            image:meetup.image,
            id:meetup._id.toString()
        }))
        },
        revalidate: 1,
    }
}

export default HomePage;