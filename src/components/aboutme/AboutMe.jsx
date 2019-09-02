import React from 'react';
import { Avatar, Grid, Hidden, LinearProgress, List, ListItem, ListItemText } from "@material-ui/core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFile, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Radium from "radium";
import { fadeInUp } from "react-animations";

import './AboutMe.css';
import './Timeline.css';
const foto = require('../../static/img/Paul.jpg');

const styles = {
    fadeInUp: {
        animation: '2s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
    }
}

const experience = [
    {
        init_date: 'March 2019',
        end_date: 'Actuallity',
        company_name: 'Xquadrone',
        description: 'Fullstack developer in charge of a directive indicators app, the one that provides to the user graphic information abourt relevant queries. The app is made in Java using Spring Boot in the backend and Javascript with React and Redux in the frontend.'
    },
    {
        init_date: 'July 2018',
        end_date: 'January 2019',
        company_name: 'AvanTI',
        description: 'Java Programmer and Data Base administrator in SIRACT, a scholar web application that allows the teachers to register they progress in the tematic contentent of their assingments'
    },
]

export default function AboutMe() {

    const technologies = [
        {
            name: 'Javascript',
            url: require('../../static/technologies/javascript.png')
        },
        {
            name: 'Redux',
            url: require('../../static/technologies/redux.png')
        },
        {
            name: 'React',
            url: require('../../static/technologies/react.png')
        },
        {
            name: 'python',
            url: require('../../static/technologies/python.png')
        },
        {
            name: 'django',
            url: require('../../static/technologies/django.png')
        },
        {
            name: 'Java',
            url: require('../../static/technologies/java.png')
        },
        {
            name: 'Spring Boot',
            url: require('../../static/technologies/springboot.png')
        },
        {
            name: 'html',
            url: require('../../static/technologies/html.png')
        },
        {
            name: 'css',
            url: require('../../static/technologies/css.png')
        },
        {
            name: 'bootstrap',
            url: require('../../static/technologies/bootstrap.png')
        }
    ];

    return (
        <div>
            <div className="am-hero">
                <h1 style={styles.fadeInUp} className="name">Paul Miranda Vega</h1>
                <Avatar style={styles.fadeInUp} className="avatar" src={foto} />
                <p style={styles.fadeInUp} className="caption">
                    Hi! I'm Paul Miranda, a web developer actually living in Mexicali, Baja California. I have experience working with Java and Javascript using frameworks like Spring Boot and ReactJS. I also have knowledges in Python and Django, in fact this entire page is using a Django API created by me as backend!. You can download my CV clicking in the document icon below or send me a mail clicking in the icon below. 
                    </p>
                <div className="social-networks" style={styles.fadeInUp}>
                    <a href="https://github.com/PaulMirve">
                        <Avatar><FontAwesomeIcon icon={faGithub} /></Avatar>
                    </a>
                    <a href="https://www.linkedin.com/in/paul-miranda-vega-28ba5b179/">
                        <Avatar><FontAwesomeIcon icon={faLinkedin} /></Avatar>
                    </a>
                    <a href="https://github.com/">
                        <Avatar><FontAwesomeIcon /><FontAwesomeIcon icon={faEnvelope} /></Avatar>
                    </a>
                    <a href={require('../../static/Curriculum.pdf')} download>
                        <Avatar><FontAwesomeIcon /><FontAwesomeIcon icon={faFile} /></Avatar>
                    </a>
                </div>
            </div>
            <div className="body">
                <div className="experience">
                    <div className="title"><h1>Work Experience</h1></div>
                    <div className="exp">
                        {
                            experience.map(job => {
                                return (

                                    <Grid className="card" item xs={12} md={9} key={job.company_name}>
                                        <Hidden
                                            xsDown
                                        >
                                            <Grid className="card-date" item xs={3}>
                                                <p>{job.init_date}</p>
                                                <p>{job.end_date}</p>
                                            </Grid>
                                        </Hidden>
                                        <Grid item className="card-description" xs={12} md={6}>
                                            <h3>{job.company_name}</h3>
                                            <p>{job.description}</p>
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="Technologies">
                    <div className="title" style={{ marginTop: '60px' }}><h1>Teconologies</h1></div>
                    <div className="techs">
                        {
                            technologies.map(tech => {
                                return (
                                    <img key={tech.name} className="tech-img" src={tech.url} alt={tech.name} />
                                );
                            })
                        }
                    </div>
                </div>
                <Grid container  style={{ marginTop: '60px' }} >
                    <Grid className="languages" item xs={12} md={6}>
                        <h1>Languages</h1>
                        <div>
                            <h5>English: 80%</h5>
                            <LinearProgress variant="determinate" value={80} style={{ height: 20 }} />
                            <h5>Japanese: 20%</h5>
                            <LinearProgress variant="determinate" value={20} style={{ marginTop: '20px', height: 20 }} />
                            <h5>Spanish: Native</h5>
                            <LinearProgress variant="determinate" style={{ marginTop: '20px', height: 20 }} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h1>Education</h1>
                        <div>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                    primary="Degree in Computational Systems"
                                    secondary="Universidad Autonóma de Baja California"
                                    />
                                </ListItem>
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>

    )
}
