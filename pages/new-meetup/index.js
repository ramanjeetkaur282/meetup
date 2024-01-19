import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';
import { Fragment } from 'react';

function NewMeetup(){

    const router=useRouter();
    async function handleAddMeetup(enteredMeetupData){
       const response=await fetch('/api/new-meetup',{
        method: 'POST',
        body:JSON.stringify(enteredMeetupData),
        headers:{
            'Content-Type':'application/json'
        }
       });

       const data=await response.json();
       router.push('/');
    }
    return(
        <Fragment>
        <Head>
            <title> Add new Meeting Point</title>
            <meta 
            name='description'
            content='Browse a huge list of highly active meetups'/>
        </Head>
        <NewMeetupForm onAddMeetup={handleAddMeetup}/>
    </Fragment>      
       
    )
}

export default NewMeetup;