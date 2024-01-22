import classes from './MeetupDetails.module.css';
import Image from 'next/image';

function MeetupDetail(props){
   return (
     <section className={classes.details}>
    <Image 
     src={props.image}
    alt={props.title}
    />
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
</section>
   )
}

export default MeetupDetail;