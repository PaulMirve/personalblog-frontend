import React, { Component } from 'react'

import './HTMLGenerator.css';
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

export default class HTMLGenerator extends Component {

    createPost = () => {
        const { text } = this.props;
        return text.blocks.map((block, index) => {
            switch (block.type) {
                case 'paragraph':
                    return <p key={index} className="paragraph" dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
                case 'image':
                    return <img key={index} className="image" src={block.data.file.url} alt={block.data.caption} />;
                case 'header':
                    switch (block.data.level) {
                        case 1:
                            return <h1 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        case 2:
                            return <h2 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        case 3:
                            return <h3 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        case 4:
                            return <h4 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        case 5:
                            return <h5 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        case 6:
                            return <h6 key={block.data.text} className="header" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        default:
                            return <p>nada</p>
                    }
                case 'list':
                    if (block.data.style === 'ordered') {
                        return (
                            <ol key={block.data.style}>
                                {
                                    block.data.items.map((item, index) => {
                                        return <li className="list" key={index} >{item}</li>
                                    })
                                }
                            </ol>
                        )
                    } else {
                        return (
                            <ul>
                                {
                                    block.data.items.map((item, index) => {
                                        return <li className="list" key={index} >{item}</li>
                                    })
                                }
                            </ul>
                        );
                    }

                case 'quote':
                    return (
                        <div key={index}>
                            <p className="quote-text" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                            <p className="quote-caption" dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                        </div>
                    );

                case 'link':
                    return <a key={index} className="link" href={'https://' + block.data.link}>{block.data.link}</a>

                case 'table':
                    return (
                        <div key={index}>Tabla</div>
                    );

                case 'checklist':
                    return (
                        <FormControl key={index}>
                            <FormGroup>
                                {
                                    block.data.items.map((item, index) => {
                                        return (
                                            <FormControlLabel
                                                className="checklist"
                                                key={index}
                                                control={<Checkbox checked={item.checked} />}
                                                label={item.text}
                                            />
                                        )
                                    })
                                }
                            </FormGroup>
                        </FormControl>
                    );
                default:
                    return <p key={index}>Elemento no especificado</p>
            }
        });
    }
    
    render() {
        return (
            <Grid container direction="column">
                <Grid item xs={12}>
                    {this.createPost()}
                </Grid>
            </Grid>
        )
    }
}
