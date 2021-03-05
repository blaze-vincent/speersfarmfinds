import Layout from "../components/Layout";
import SalesItemUploadForm from '../components/SalesItemUploadForm';
import LoginForm from '../components/LoginForm';

export default function Admin(){
    return (<Layout noContact="true">
        <LoginForm></LoginForm>
        <SalesItemUploadForm />
    </Layout>)
}