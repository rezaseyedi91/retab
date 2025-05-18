import { TMeiTagFactoryArgs } from "./MeiTag";


export const HARD_CODED_APP_INFO = {
    name: 'ReTab', version: '0.1', isodate: '2024-12-3'
}
export const HARD_CODED_HEADER_ARGS: TMeiTagFactoryArgs = {
    tagTitle: 'meiHead',
    children: [
        {
            tagTitle: 'fileDesc',
            children: [
                {
                    tagTitle: 'titleStmt',
                    children: [
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'main' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'Alternative' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'desc' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'subtitle' }], textContent: 'A Digital Edition' },
                        {
                            tagTitle: 'composer', children: [
                                { tagTitle: 'persName' }
                            ]
                        },
                        {
                            tagTitle: 'respStmt', children: [
                                {
                                    tagTitle: 'persName', textContent: 'Ailin Arjmand',
                                    attributes: [
                                        { title: 'xml:id', value: 'AA' },
                                        { title: 'role', value: 'encoder' },
                                        { title: 'auth', value: 'Orcid' },
                                        { title: 'auth.uri', value: 'https://orcid.org/0009-0004-9844-9662' },
                                    ]
                                },
                                {
                                    tagTitle: 'corpName', children: [
                                        { tagTitle: 'name', textContent: 'Centre national de la recherche scientifique' },
                                        {
                                            tagTitle: 'corpName', children: [
                                                { tagTitle: 'name', textContent: 'RicercarLab' },
                                                {
                                                    tagTitle: 'address', children: [
                                                        { tagTitle: 'street', textContent: '59 rue Néricault Destouches' },
                                                        { tagTitle: 'postBox', textContent: 'BP12050' },
                                                        { tagTitle: 'postCode', textContent: '37020' },
                                                        { tagTitle: 'settlement', textContent: 'Tours' },
                                                        { tagTitle: 'country', textContent: 'France' },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagTitle: 'funder', children: [
                                { tagTitle: 'corpName', textContent: 'Biblissima+' },
                                {
                                    tagTitle: 'corpName', textContent: "Centre d'études supérieures de la Renaissance", attributes: [
                                        { title: 'auth', value: 'ROR' },
                                        { title: 'auth.uri', value: 'https://ror.org/03cv31q28' },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagTitle: 'pubStmt', children: [
                        { tagTitle: 'availability', textContent: '© 2024 RicercarLab' }
                    ]
                },
                {tagTitle: 'sourceDesc', children :[
                    {
                        tagTitle: 'source', attributes: [{ title: 'recordtype', value: 'd' }], children: [
                            {
                                tagTitle: 'bibl', children: [
                                    {
                                        tagTitle: 'physLoc', children: [
                                            {
                                                tagTitle: 'repository', children: [
                                                    { tagTitle: 'corpName', textContent: 'Pesaro-Villa Imperiale-Archivio Albani' }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tagTitle: 'title', textContent: '', attributes: [{ title: 'type', value: 'alternative' }],
                                    },
                                    {
                                        tagTitle: 'locus', textContent: '', attributes: [
                                            { title: 'label', value: 'folio' },
                                            { title: 'from', value: 'alternative' },
                                            { title: 'to', value: 'alternative' },
                                        ],
    
                                    },
                                    {
                                        tagTitle: 'biblScope', children: [
                                            {
                                                tagTitle: 'num', attributes: [{ title: 'label', value: 'workposition' }], textContent: ''
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
    
                    }
                ]}
            ]
        },
        {
            tagTitle: 'encodingDesc',
            children: [
                {
                    tagTitle: 'appInfo',
                    children: [
                        {
                            tagTitle: 'head',
                            children: [
                                {
                                    tagTitle: 'persName', textContent: 'Reza Seyedi',
                                    attributes: [{ title: 'xml:id', value: 'ReSe' }, { title: 'role', value: 'Developer' },]
                                },
                                {
                                    tagTitle: 'persName', textContent: 'Ailin Arjmand',
                                    attributes: [{ title: 'xml:id', value: 'AA' }, { title: 'role', value: 'Collaborator' },
                                    { title: 'auth', value: 'Orcid' }, { title: 'auth.uri', value: 'https://orcid.org/0009-0004-9844-9662' },

                                    ]
                                },

                            ]
                        },
                        {
                            tagTitle: 'application',
                            attributes: [
                                { title: 'isodate', value: HARD_CODED_APP_INFO.isodate },
                                { title: 'version', value: HARD_CODED_APP_INFO.version },
                                { title: 'xml:id', value: HARD_CODED_APP_INFO.name },
                            ],
                            children: [
                                { tagTitle: 'name', textContent: HARD_CODED_APP_INFO.name }
                            ]
                        }
                    ]
                },
                {
                    tagTitle: 'projectDesc', children: [
                        { tagTitle: 'head', textContent: 'RicercarLab research project' },
                        { tagTitle: 'p', textContent: 'Tablature Albani-Biblissima+' },
                    ]
                }
            ]
        },
        {
            tagTitle: 'workList',
            children: [
                {
                    tagTitle: 'work',
                    children: [
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'main' }] },
                        {
                            tagTitle: 'composer', children: [
                                { tagTitle: 'persName', }
                            ]
                        },
                        {
                            tagTitle: 'creation', children: [
                                {
                                    tagTitle: 'date',
                                    attributes: [
                                        {title: 'notbefore', value: '1580'},
                                        {title: 'notafter', value: '1640'},
                                        {title: 'cert', value: 'low'},
                                    ],
                                    textContent: '1580-1640',
                                },
                                { tagTitle: 'settlement', textContent: 'Pesaro' },
                                { tagTitle: 'country', textContent: 'Italy' },

                            ]
                        },
                        {
                            tagTitle: 'classification', children: [
                                {
                                    tagTitle: 'termList', children: [
                                        {
                                            tagTitle: 'term', attributes: [{title: 'label', value: 'genre'}], textContent: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagTitle: 'relationList', children: [
                                {
                                    tagTitle: 'relation', attributes: [
                                        {title: 'rel', value: 'isPartOf'},
                                        {title: 'target', value: 'Ricercar Id Work (url)'},
                                    ], selfClosing: true
                                }
                            ]
                        },
                        // {
                        //     tagTitle: 'notesStmt', children: [
                        //         { tagTitle: 'annot' }
                        //     ]
                        // }
                    ]
                }
            ]

        },
    ]
}



export const HARD_CODED_HEADER_EMPTY_ARGS: TMeiTagFactoryArgs = {
    tagTitle: 'meiHead',
    children: [
        {
            tagTitle: 'fileDesc',
            children: [
                {
                    tagTitle: 'titleStmt',
                    children: [
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'main' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'Alternative' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'desc' }] },
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'subtitle' }], textContent: '' },
                        {
                            tagTitle: 'composer', children: [
                                { tagTitle: 'persName' }
                            ]
                        },
                        {
                            tagTitle: 'respStmt', children: [
                                {
                                    tagTitle: 'persName', textContent: '',
                                    attributes: [
                                        { title: 'xml:id', value: '' },
                                        { title: 'role', value: 'encoder' },
                                        { title: 'auth', value: '' },
                                        { title: 'auth.uri', value: '' },
                                    ]
                                },
                                {
                                    tagTitle: 'corpName', children: [
                                        { tagTitle: 'name', textContent: '' },
                                        {
                                            tagTitle: 'corpName', children: [
                                                { tagTitle: 'name', textContent: '' },
                                                {
                                                    tagTitle: 'address', children: [
                                                        { tagTitle: 'street', textContent: '' },
                                                        { tagTitle: 'postBox', textContent: '' },
                                                        { tagTitle: 'postCode', textContent: '' },
                                                        { tagTitle: 'settlement', textContent: '' },
                                                        { tagTitle: 'country', textContent: '' },
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagTitle: 'funder', children: [
                                { tagTitle: 'corpName', textContent: '' },
                                {
                                    tagTitle: 'corpName', textContent: "", attributes: [
                                        { title: 'auth', value: ' ' },
                                        { title: 'auth.uri', value: ' ' },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagTitle: 'pubStmt', children: [
                        { tagTitle: 'availability', textContent: '' }
                    ]
                },
                {tagTitle: 'sourceDesc', children :[
                    {
                        tagTitle: 'source', attributes: [{ title: 'recordtype', value: 'd' }], children: [
                            {
                                tagTitle: 'bibl', children: [
                                    {
                                        tagTitle: 'physLoc', children: [
                                            {
                                                tagTitle: 'repository', children: [
                                                    { tagTitle: 'corpName', textContent: '' }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        tagTitle: 'title', textContent: '', attributes: [{ title: 'type', value: 'alternative' }],
                                    },
                                    {
                                        tagTitle: 'locus', textContent: '', attributes: [
                                            { title: 'label', value: 'folio' },
                                            { title: 'from', value: 'alternative' },
                                            { title: 'to', value: 'alternative' },
                                        ],
    
                                    },
                                    {
                                        tagTitle: 'biblScope', children: [
                                            {
                                                tagTitle: 'num', attributes: [{ title: 'label', value: 'workposition' }], textContent: ''
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
    
                    }
                ]}
            ]
        },
        {
            tagTitle: 'encodingDesc',
            children: [
                {
                    tagTitle: 'appInfo',
                    children: [
                        {
                            tagTitle: 'head',
                            children: [
                                {
                                    tagTitle: 'persName', textContent: 'Reza Seyedi',
                                    attributes: [{ title: 'xml:id', value: 'ReSe' }, { title: 'role', value: 'Developer' },]
                                },
                                {
                                    tagTitle: 'persName', textContent: 'Ailin Arjmand',
                                    attributes: [{ title: 'xml:id', value: 'AA' }, { title: 'role', value: 'Collaborator' },
                                    { title: 'auth', value: 'Orcid' }, { title: 'auth.uri', value: 'https://orcid.org/0009-0004-9844-9662' },

                                    ]
                                },

                            ]
                        },
                        {
                            tagTitle: 'application',
                            attributes: [
                                { title: 'isodate', value: HARD_CODED_APP_INFO.isodate },
                                { title: 'version', value: HARD_CODED_APP_INFO.version },
                                { title: 'xml:id', value: HARD_CODED_APP_INFO.name },
                            ],
                            children: [
                                { tagTitle: 'name', textContent: HARD_CODED_APP_INFO.name }
                            ]
                        }
                    ]
                },
                {
                    tagTitle: 'projectDesc', children: [
                        { tagTitle: 'head', textContent: '' },
                        { tagTitle: 'p', textContent: '' },
                    ]
                }
            ]
        },
        {
            tagTitle: 'workList',
            children: [
                {
                    tagTitle: 'work',
                    children: [
                        { tagTitle: 'title', attributes: [{ title: 'type', value: 'main' }] },
                        {
                            tagTitle: 'composer', children: [
                                { tagTitle: 'persName', }
                            ]
                        },
                        {
                            tagTitle: 'creation', children: [
                                {
                                    tagTitle: 'date',
                                    attributes: [
                                        {title: 'notbefore', value: ''},
                                        {title: 'notafter', value: ''},
                                        {title: 'cert', value: 'low'},
                                    ],
                                    textContent: '',
                                },
                                { tagTitle: 'settlement', textContent: '' },
                                { tagTitle: 'country', textContent: '' },

                            ]
                        },
                        {
                            tagTitle: 'classification', children: [
                                {
                                    tagTitle: 'termList', children: [
                                        {
                                            tagTitle: 'term', attributes: [{title: 'label', value: 'genre'}], textContent: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagTitle: 'relationList', children: [
                                {
                                    tagTitle: 'relation', attributes: [
                                        {title: 'rel', value: 'isPartOf'},
                                        {title: 'target', value: 'Ricercar Id Work (url)'},
                                    ], selfClosing: true
                                }
                            ]
                        },
                        // {
                        //     tagTitle: 'notesStmt', children: [
                        //         { tagTitle: 'annot' }
                        //     ]
                        // }
                    ]
                }
            ]

        },
    ]
}