var pg = 0; // page number
var results = []; // results array
var riskCat, riskStyle, riskColor;

document.getElementById("back").addEventListener("click", function() {
    pg = pg - 1;
    showPage();
    results.pop();
    //console.log(results);
    if (document.getElementById("pdfBox").style.display != "none") {
        document.getElementById("pdfBox").style.display = "none";
    }
});

document.getElementById("restart").addEventListener("click", function() {
    pg = 0;
    showPage();
    results = [];
    //console.log(results);
    if (document.getElementById("pdfBox").style.display != "none") {
        document.getElementById("pdfBox").style.display = "none";
    }
});

document.getElementById("start").addEventListener("click", function() {
    document.getElementById("start").style.display = "none";
    pg = 1;
    showPage();
    document.getElementById("back").style.display = "block";
    document.getElementById("restart").style.display = "block";
});

document.getElementById("low").addEventListener("click", function() {
    pg = pg + 1;
    results.push("l");
    //console.log(results);
    showPage();
});

document.getElementById("med").addEventListener("click", function() {
    pg = pg + 1;
    results.push("m");
    //console.log(results);
    showPage();
});

document.getElementById("hi").addEventListener("click", function() {
    pg = pg + 1;
    results.push("h");
    //console.log(results);
    showPage();
});

function showPage() {
    if (pg == 0) {
        document.getElementById("back").style.display = "none";
        document.getElementById("qno").innerHTML = "This app allows dentists to quickly and accurately risk assess patients for dental caries.";
        document.getElementById("restart").style.display = "none";
        document.getElementById("q").innerHTML = "Press the 'start' button below to begin the assessment.";
        document.getElementById("low").style.display = "none";
        document.getElementById("med").style.display = "none";
        document.getElementById("hi").style.display = "none";
        document.getElementById("start").style.display = "block";
        document.getElementById("pdfBox").style.display = "none";
    }
    if (pg == 1) {
        page(
            "<b>Fluoride exposure</b> (through drinking water, supplements, professional applications, toothpaste)", 
            "Yes", "No", null
        );
    } else if (pg == 2) {
        page(
            "<b>Sugary foods or drinks</b> (including juice, carbonated or non-carbonated soft drinks, energy drinks, medicinal syrups)",
            "Primarily at mealtimes", null, "Frequent or prolonged exposure between meals"
        );
    } else if (pg == 3) {
        page(
            "<b>Caries experience of caregiver and/or other siblings</b> (for patients ages 6&ndash;14)",
            "No carious lesions in last 24 months", "Carious lesions in last 7&ndash;23 months", "Carious lesions in last 6 months"
        );
    } else if (pg == 4) {
        page(
            "<b>Dental home:</b> established patient of record, receiving regular dental care in a dental practice",
            "Yes", "No", null
        );
    } else if (pg == 5) {
        page(
            "<b>Special healthcare needs</b> (developmental, physical, medical or mental disabilities that prevent or limit performance of adequate oral health care by themselves or caregivers)",
            "No", "Yes (over age 14)", "Yes (ages 6&ndash;14)"
        );
    } else if (pg == 6) {
        page(
            "<b>Chemo- or radio-therapy</b>",
            "No", null, "Yes"
        );
    } else if (pg == 7) {
        page(
            "<b>Eating disorders</b>",
            "No", "Yes", null
        );
    } else if (pg == 8) {
        page(
            "<b>Medications that reduce salivary flow</b>",
            "No", "Yes", null
        );
    } else if (pg == 9) {
        page(
            "<b>Drug or alcohol abuse</b>",
            "No", "Yes", null
        );
    } else if (pg == 10) {
        page(
            "<b>Cavitated or non-cavitated carious lesions or restorations</b> (visually or radiographically evident)",
            "No new carious lesions or restorations in last 36 months", "1&ndash;2 new carious lesions or restorations in last 36 months", "3 or more carious lesions or restorations in last 36 months"
        );
    } else if (pg == 11) {
        page(
            "<b>Teeth extracted due to caries</b> in past 36 months",
            "No", null, "Yes"
        );
    } else if (pg == 12) {
        page(
            "<b>Visible plaque</b>",
            "No", "Yes", null
        );
    } else if (pg == 13) {
        page(
            "<b>Unusual tooth morphology</b> that compromises oral hygiene",
            "No", "Yes", null
        );
    } else if (pg == 14) {
        page(
            "<b>Interproximal restorations</b> (1 or more)",
            "No", "Yes", null
        );
    } else if (pg == 15) {
        page(
            "<b>Exposed root surfaces</b> present",
            "No", "Yes", null
        );
    } else if (pg == 16) {
        page(
            "<b>Restorations with overhangs</b> and/or <b>open margins</b>; <b>open contacts</b> with food impaction",
            "No", "Yes", null
        );
    } else if (pg == 17) {
        page(
            "<b>Dental/orthodontic appliances</b> (fixed or removable)",
            "No", "Yes", null
        );
    } else if (pg == 18) {
        page(
            "<b>Severe dry mouth (xerostomia)</b>",
            "No", null, "Yes"
        );
    } else if (pg == 19) {
        var i, rLen;
        var rLow = 0;
        var rMed = 0;
        var rHi = 0;
        rLen = results.length;
        for (i = 0; i < rLen; i++) {
            if (results[i] == "l") {
                rLow = rLow + 1;
            } else if (results[i] == "m") {
                rMed = rMed + 1;
            } else {
                rHi = rHi + 1;
            }
        }
        //console.log(rLow, rMed, rHi);
        if (rHi > 0) {
            riskCat = "High";
            riskColor = "#e44024";
            riskStyle = "hi";
        } else if (rMed > 0) {
            riskCat = "Moderate";
            riskColor = "#ffb81c";
            riskStyle = "mod";
        } else {
            riskCat = "Low";
            riskColor = "#78be20";
            riskStyle = "low";
        }
        //console.log("Risk: " + riskCat);
        document.getElementById("qno").innerHTML = "";
        document.getElementById("q").innerHTML = "Overall assessment of dental caries risk:<br /><br /><span id='riskResult' style='color: " + riskColor + ";'>" + riskCat + "</span>";
        document.getElementById("low").style.display = "none";
        document.getElementById("med").style.display = "none";
        document.getElementById("hi").style.display = "none";
        document.getElementById("pdfBox").style.display = "block";
    }
}

function page(q, l, m, h) {
    document.getElementById("qno").innerHTML = pg + "/18";
    document.getElementById("q").innerHTML = q;

    var low = document.getElementById("low");
    if (l != null) {
        low.style.display = "block";
        low.innerHTML = l;
    } else {
        low.style.display = "none";
    }

    var med = document.getElementById("med");
    if (m != null) {
        med.style.display = "block";
        med.innerHTML = m;
    } else {
        med.style.display = "none";
    }

    var hi = document.getElementById("hi");
    if (h != null) {
        hi.style.display = "block";
        hi.innerHTML = h;
    } else {
        hi.style.display = "none";
    }
}	
document.getElementById("pdfBtn").addEventListener("click", function() {
    var pName = document.getElementById("myForm").elements.namedItem("pName").value;
    var pBirth = document.getElementById("myForm").elements.namedItem("pBirth").value;
    var cName = document.getElementById("myForm").elements.namedItem("cName").value;
    var docName = 'CRA ' + pName + ' ' + date();
    function date() {
        var d = new Date();
        var y = d.getFullYear();
        var m = d.getMonth();
        var d = d.getDate();
        return y + '/' + m + '/' + d;
    }
    var checkBoxLeft = "<svg width='11' height='11'><rect x='1' y='2' rx='2' ry='2' width='8' height='8' style='fill:#ffffff; stroke:#425563; stroke-width:1; opacity:1' /><polyline points='2.5,6 4.5,8 7.5,4' stroke-linecap='round' style='fill: none; stroke:#425563; stroke-width:1' /></svg>";
    var emptyBoxLeft = "<svg width='11' height='11'><rect x='1' y='2' rx='2' ry='2' width='8' height='8' style='fill:#ffffff; stroke:#425563; stroke-width:1; opacity:1' /></svg>";
    var checkBoxTop = "<svg width='75' height='11'><rect x='33.5' y='2' rx='2' ry='2' width='8' height='8' style='fill:#ffffff; stroke:#425563; stroke-width:1; opacity:1' /><polyline points='35,6 37,8 40,4' stroke-linecap='round' style='fill: none; stroke:#425563; stroke-width:1' /></svg>";
    var emptyBoxTop = "<svg width='75' height='11'><rect x='33.5' y='2' rx='2' ry='2' width='8' height='8' style='fill:#ffffff; stroke:#425563; stroke-width:1; opacity:1' /></svg>";
    function getBox (q, risk, pos) {
        q = q - 1;
        if (risk == results[q]) {
            if (pos == 'left') {
                return checkBoxLeft;
            } else if (pos == 'top') {
                return checkBoxTop;
            }
        } else {
            if (pos == 'left') {
                return emptyBoxLeft;
            } else if (pos == 'top') {
                return emptyBoxTop;
            }
        }
    }		
    var docDefinition = {
        info: {
            title: docName,
            creator: 'bocaj130.github.io/caries-risk-assessment',
            producer: 'bocaj130.github.io/caries-risk-assessment'
        },
        content: [
            {text: 'Caries Risk Assessment', style: 'title', alignment: 'center'},
            {
                style: 'tableExample',
                color: '#231f20',
                fontSize: 12,
                table: {
                    widths: ['auto', '*', 'auto', "*"],
                    headerRows: 0,
                    body: [
                        [{text: 'Patient name:', bold: 'true', alignment: 'right'}, {text: pName, style: 'details'}, {text: 'Clinician:', bold: 'true', alignment: 'right'}, {text: cName, style: 'details'}],
                        [{text: 'Birth Date:', bold: 'true', alignment: 'right'}, {text: pBirth, style: 'details'}, {text: 'Date:', bold: 'true', alignment: 'right'}, {text: date(), style: 'details'}],
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0 : 1;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 'white' : 'white';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 'white' : 'white';
                    },
                }
            },
            {
                style: 'tableExample',
                color: '#231f20',
                fontSize: 12,
                table: {
                    widths: ['*', 'auto', 'auto', '*'],
                    headerRows: 0,
                    body: [
                        ['', {text: 'Overall assessment of dental caries risk: ', bold: false}, {text: riskCat, bold: true, style: riskStyle}, ''],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                color: '#231f20',
                alignment: 'center',
                fontSize: 11,
                table: {
                    widths: ['auto', '*', 75, 75, 75],
                    headerRows: 1,
                    body: [
                        [{border: [false, false, false, true], text: ''}, {border: [false, false, true, true], text: ''}, {text: 'Low risk', style: 'low', bold: 'true'}, {text: 'Moderate risk', style: 'mod', bold: 'true'}, {text: 'High risk', style: 'hi', bold: 'true'}],
                        [{colSpan: 2, text: 'Contributing conditions', style: 'tableHeader'}, '', {colSpan: 3, text: 'Check the conditions that apply', style: 'tableHeader'}, '', ''],
                        [
                            '1', 
                            {text: [{text: 'Fluoride exposure ', bold: true}, '(through drinking water, supplements, professional applications, toothpaste)'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(1, 'l', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(1, 'm', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '2', 
                            {text: [{text: 'Sugary foods or drinks ', bold: true}, '(including juice, carbonated or non-carbonated soft drinks, energy drinks, medicinal syrups)'], alignment: 'left'}, 
                            {stack: [{columns: [{svg: getBox(2, 'l', 'top')}]}, '\nPrimarily at mealtimes'], style: 'low'}, 
                            {text: '', style: 'mod'}, 
                            {stack: [{columns: [{svg: getBox(2, 'h', 'top')}]}, '\nFrequent or prolonged exposure between meals'], style: 'hi'}
                        ],
                        [
                            '3', 
                            {text: [{text: 'Caries experience of caregiver and/or other siblings ', bold: true}, '(for patients ages 6–14)'], alignment: 'left'}, 
                            {stack: [{columns: [{svg: getBox(3, 'l', 'top')}]}, '\nNo carious lesions in last 24 months'], style: 'low'}, 
                            {stack: [{columns: [{svg: getBox(3, 'm', 'top')}]}, '\nCarious lesions in last 7–23 months'], style: 'mod'}, 
                            {stack: [{columns: [{svg: getBox(3, 'h', 'top')}]}, '\nCarious lesions in last 6 months'], style: 'hi'}
                        ],
                        [
                            '4', 
                            {text: [{text: 'Dental home: ', bold: true}, 'established patient of record, receiving regular dental care in a dental practice'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(4, 'l', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(4, 'm', 'left')}, {text: 'No'}, {wodth: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [{colSpan: 2, text: 'General health conditions', style: 'tableHeader'}, '', {colSpan: 3, text: 'Check the conditions that apply', style: 'tableHeader'}, '', ''],
                        [
                            '5', 
                            {text: [{text: 'Special healthcare needs ', bold: true}, '(developmental, physical, medical or mental disabilities that prevent or limit performance of adequate oral hygiene)'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(5, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {stack: [{columns: [{width: '*', text: ''}, {svg: getBox(5, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}]}, '(over age 14)'], style: 'mod'},
                            //{text: 'Yes\n(over age 14)', style: 'mod'}, 
                            {stack: [{columns: [{width: '*', text: ''}, {svg: getBox(5, 'h', 'left')}, {text: 'Yes'}, {width: '*', text: ''}]}, '(ages 6–14)'], style: 'hi'},
                            //{text: 'Yes\n(ages 6–14)', style: 'hi'}
                        ],
                        [
                            '6', 
                            {text: 'Chemo- or radio-therapy', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(6, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {text: '', style: 'mod'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(6, 'h', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'hi'}
                        ],
                        [
                            '7', 
                            {text: 'Eating disorders', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(7, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(7, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '8', 
                            {text: 'Medications that reduce salivary flow', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(8, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(8, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '9', 
                            {text: 'Drug or alcohol abuse', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(9, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(9, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [{colSpan: 2, text: 'Clinical conditions', style: 'tableHeader'}, '', {colSpan: 3, text: 'Check the conditions that apply', style: 'tableHeader'}, '', ''],
                        [
                            '10', 
                            {text: [{text: 'Cavitated or non-cavitated carious lesions or restorations ', bold: true}, '(visually or radiographically evident)'], alignment: 'left'}, 
                            {stack: [{columns: [{svg: getBox(10, 'l', 'top')}]}, {text: '\nNone in last 36 months'}], style: 'low'}, 
                            {stack: [{columns: [{svg: getBox(10, 'm', 'top')}]}, {text: '\n1–2 in last 36 months'}], style: 'mod'}, 
                            {stack: [{columns: [{svg: getBox(10, 'h', 'top')}]}, {text: '\n≥3 in last 36 months'}], style: 'hi'}
                        ],
                        [
                            '11', 
                            {text: [{text: 'Teeth extracted due to caries ', bold: true}, 'in past 36 months'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(11, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {text: '', style: 'mod'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(11, 'h', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'hi'}
                        ],
                        [
                            '12', 
                            {text: 'Visible plaque', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(12, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(12, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '13', 
                            {text: [{text: 'Unusual tooth morphology ', bold: true}, 'that compromises oral hygiene'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(13, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(13, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '14', 
                            {text: [{text: 'Interproximal restorations ', bold: true}, '(1 or more)'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(14, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(14, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '15', 
                            {text: [{text: 'Exposed root surfaces ', bold: true}, 'present'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(15, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(15, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '16', 
                            {text: [{text: 'Restorations with overhangs ', bold: true}, 'and/or ', {text: 'open margins', bold: true}, '; ', {text: 'open contacts ', bold: true}, 'with food impaction'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(16, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(16, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '17', 
                            {text: [{text: 'Dental/orthodontic appliances ', bold: true}, 'fixed or removable'], alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(17, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(17, 'm', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'mod'}, 
                            {text: '', style: 'hi'}
                        ],
                        [
                            '18', 
                            {text: 'Severe dry mouth (xerostomia)', bold: true, alignment: 'left'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(18, 'l', 'left')}, {text: 'No'}, {width: '*', text: ''}], style: 'low'}, 
                            {text: '', style: 'mod'}, 
                            {columns: [{width: '*', text: ''}, {svg: getBox(18, 'h', 'left')}, {text: 'Yes'}, {width: '*', text: ''}], style: 'hi'}
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                    },
                    hLineColor: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#425563' : '#425563';
                    },
                    vLineColor: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#425563' : '#425563';
                    },
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 0, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 11,
                color: '#ffffff',
                fillColor: '#005eb8'
            },
            title: {
                fontSize: 25,
                bold: true,
                margin: [0, 0, 0, 30],
                color: '#005eb8'
            },
            low: {
                fillColor: '#aed87f'
            },
            mod: {
                fillColor: '#ffd581'
            },
            hi: {
                fillColor: '#ef8c7f'
            },
            details: {
                fillColor: '#e8edee'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
            columnGap: 0
        }
    };
    pdfMake.createPdf(docDefinition).download(docName);
});