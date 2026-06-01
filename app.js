let config;

fetch("config.json")
.then(res=>res.json())
.then(data=>{

    config=data;

    loadBaseData();

});

function loadBaseData(){

    fillSelect(
        "caseType",
        config.caseTypes
    );

    fillSelect(
        "location",
        config.locations
    );

    config.phrases.forEach(group=>{

        switch(group.category){

            case "到場情形":
                fillSelect("arrival",group.items);
                break;

            case "案情研判":
                fillSelect("analysis",group.items);
                break;

            case "傷勢確認":
                fillSelect("injury",group.items);
                break;

            case "告訴意願":
                fillSelect("complaint",group.items);
                break;

            case "依法偵辦":
                fillSelect("law",group.items);
                break;

            case "監視蒐證":
                fillSelect("evidence",group.items);
                break;

        }

    });

}

function fillSelect(id,data){

    let select=document.getElementById(id);

    data.forEach(item=>{

        let option=document.createElement("option");

        option.value=item;
        option.text=item;

        select.appendChild(option);

    });

}

function generateReport(){

    let caseType=
    document.getElementById("caseType").value;

    let location=
    document.getElementById("location").value;

    let arrival=
    document.getElementById("arrival").value;

    let analysis=
    document.getElementById("analysis").value;

    let injury=
    document.getElementById("injury").value;

    let complaint=
    document.getElementById("complaint").value;

    let law=
    document.getElementById("law").value;

    let evidence=
    document.getElementById("evidence").value;

    let report=`

案件類型：${caseType}

發生地點：${location}

${config.summaryTemplates.line1}

${config.summaryTemplates.line2}

${arrival}

${analysis}

${injury}

${complaint}

${evidence}

${law}

`;

document.getElementById("output").value=
report;

}

function copyText(){

    let txt=
    document.getElementById("output");

    txt.select();

    navigator.clipboard.writeText(
        txt.value
    );

    alert("已複製");
}
