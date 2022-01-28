import React from 'react';
import Layout from "../../Layout";
import component from "./Home.module.scss"
import Container from "../../components/Container/Container";
import {Navigate, Route, Routes} from "react-router-dom";
import Weather from "../Weather";

const Home: React.FC = (props) => {

    return(
        <Layout>
            <main className={component.main}>
                <Container>
                    <div className={component.main__inner}>
                        <Routes>
                            <Route path={'/weather'} element={<Weather/>}/>
                            <Route path={'*'} element={<Navigate to={'/weather'}/>}/>
                        </Routes>
                    </div>
                </Container>
            </main>
        </Layout>
    )
}

export default Home;