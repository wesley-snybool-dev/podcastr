import { useRouter } from 'next/router'


const router = useRouter();


export default function Episode () {
    return(
        <h1>{router.query.slug}</h1>
    );
}