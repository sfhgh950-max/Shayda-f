/* =============
/* ==========================================
   SHAYDA
   Version 1.0
   Smart Human Resource Platform


   Designed & Engineered by Mr Sj
========================================== */



/* ==========================================
        DOM ELEMENTS
========================================== */


const postTitleInput =
    document.getElementById("postTitle");


const postCodeInput =
    document.getElementById("postCode");


const postLevelInput =
    document.getElementById("postLevel");


const organizationalUnitInput =
    document.getElementById("organizationalUnit");


const jobTextInput =
    document.getElementById("jobText");


const analyzeBtn =
    document.getElementById("analyzeBtn");


const clearBtn =
    document.getElementById("clearBtn");


const resultsSection =
    document.getElementById("resultsSection");


const downloadPdfBtn =
    document.getElementById("downloadPdfBtn");



/* ==========================================
        RESULT ELEMENTS
========================================== */


const resultPostTitle =
    document.getElementById("resultPostTitle");


const resultPostCode =
    document.getElementById("resultPostCode");


const resultPostLevel =
    document.getElementById("resultPostLevel");


const resultOrganizationalUnit =
    document.getElementById(
        "resultOrganizationalUnit"
    );


const shaydaScore =
    document.getElementById("shaydaScore");


const matchScore =
    document.getElementById("matchScore");


const riskScore =
    document.getElementById("riskScore");


const jobSummary =
    document.getElementById("jobSummary");


const riskExplanation =
    document.getElementById(
        "riskExplanation"
    );


const competenciesTable =
    document.getElementById(
        "competenciesTable"
    );


const technicalSkills =
    document.getElementById(
        "technicalSkills"
    );


const behavioralSkills =
    document.getElementById(
        "behavioralSkills"
    );


const softwareSkills =
    document.getElementById(
        "softwareSkills"
    );


const strengths =
    document.getElementById(
        "strengths"
    );


const developmentRoadmap =
    document.getElementById(
        "developmentRoadmap"
    );


const trainingCourses =
    document.getElementById(
        "trainingCourses"
    );


const improvementAreas =
    document.getElementById(
        "improvementAreas"
    );


const managementRecommendation =
    document.getElementById(
        "managementRecommendation"
    );


const analysisExplanation =
    document.getElementById(
        "analysisExplanation"
    );



/* ==========================================
        INITIAL STATE
========================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        if (resultsSection) {


            resultsSection.style.display =
                "none";


        }


    }
);



/* ==========================================
        ANALYZE BUTTON
========================================== */


if (analyzeBtn) {


    analyzeBtn.addEventListener(
        "click",
        analyzeJob
    );


}



/* ==========================================
        CLEAR BUTTON
========================================== */


if (clearBtn) {


    clearBtn.addEventListener(
        "click",
        clearForm
    );


}



/* ==========================================
        MAIN ANALYSIS FUNCTION
========================================== */


function analyzeJob() {


    const postTitle =
        postTitleInput.value.trim();


    const postCode =
        postCodeInput.value.trim();


    const postLevel =
        postLevelInput.value;


    const organizationalUnit =
        organizationalUnitInput.value;


    const jobText =
        jobTextInput.value.trim();



    /* ======================================
            VALIDATION
    ====================================== */


    if (!postTitle) {


        showMessage(
            "لطفاً عنوان پست را وارد نمایید."
        );


        postTitleInput.focus();


        return;


    }



    if (!postLevel) {


        showMessage(
            "لطفاً سطح پست را انتخاب نمایید."
        );


        postLevelInput.focus();


        return;


    }



    if (!organizationalUnit) {


        showMessage(
            "لطفاً واحد سازمانی را انتخاب نمایید."
        );


        organizationalUnitInput.focus();


        return;


    }



    if (!jobText) {


        showMessage(
            "لطفاً شرح شغل را وارد نمایید."
        );


        jobTextInput.focus();


        return;


    }



    /* ======================================
            SHOW LOADING STATE
    ====================================== */


    setLoadingState(true);



    /*
        فعلاً برای تست رابط کاربری
        یک تأخیر کوتاه شبیه‌سازی می‌کنیم.


        در مرحله بعد این قسمت به API
        تحلیل هوشمند متصل خواهد شد.
    */


    setTimeout(() => {


        const analysis =
            generateDemoAnalysis({


                postTitle,


                postCode,


                postLevel,


                organizationalUnit,


                jobText


            });



        renderResults(analysis);



        setLoadingState(false);



    }, 1200);


}



/* ==========================================
        DEMO ANALYSIS ENGINE
========================================== */


function generateDemoAnalysis(data) {


    const {


        postTitle,


        postCode,


        postLevel,


        organizationalUnit,


        jobText


    } = data;



    /*
        این مقادیر موقت هستند.


        در نسخه API واقعی،
        این بخش با تحلیل واقعی
        جایگزین خواهد شد.
    */



    const competencies = [


        {
            name:
                "تفکر تحلیلی",


            definition:
                "توانایی تجزیه و تحلیل اطلاعات، شناسایی روابط میان داده‌ها و استفاده از شواهد برای تصمیم‌گیری.",


            required: 5,


            current: 4,


            gap: 1
        },


        {
            name:
                "حل مسئله",


            definition:
                "توانایی شناسایی مسائل، بررسی علل و ارائه راهکارهای مؤثر و عملی.",


            required: 5,


            current: 4,


            gap: 1
        },


        {
            name:
                "تصمیم‌گیری",


            definition:
                "توانایی ارزیابی گزینه‌ها و انتخاب بهترین راهکار با توجه به اهداف و محدودیت‌های موجود.",


            required: 4,


            current: 4,


            gap: 0
        },


        {
            name:
                "برنامه‌ریزی و سازماندهی",


            definition:
                "توانایی تعیین اولویت‌ها، تنظیم فعالیت‌ها و مدیریت منابع برای دستیابی به اهداف.",


            required: 5,


            current: 4,


            gap: 1
        },


        {
            name:
                "ارتباط مؤثر",


            definition:
                "توانایی انتقال شفاف اطلاعات و برقراری ارتباط سازنده با افراد و گروه‌های مختلف.",


            required: 4,


            current: 4,


            gap: 0
        },


        {
            name:
                "کار تیمی",


            definition:
                "توانایی همکاری مؤثر با دیگران برای دستیابی به اهداف مشترک سازمانی.",


            required: 4,


            current: 4,


            gap: 0
        },


        {
            name:
                "مسئولیت‌پذیری",


            definition:
                "تعهد به انجام مسئولیت‌ها، پاسخگویی نسبت به نتایج و رعایت الزامات سازمانی.",


            required: 5,


            current: 5,


            gap: 0
        },


        {
            name:
                "یادگیری و توسعه",


            definition:
                "توانایی یادگیری مستمر، پذیرش بازخورد و توسعه دانش و مهارت‌های حرفه‌ای.",


            required: 4,


            current: 3,


            gap: 1
        },


        {
            name:
                "تمرکز بر نتیجه",


            definition:
                "توانایی تمرکز بر اهداف و دستیابی به نتایج مورد انتظار با استفاده مؤثر از منابع.",


            required: 5,


            current: 4,


            gap: 1
        },


        {
            name:
                "انطباق‌پذیری",


            definition:
                "توانایی سازگاری با تغییرات، شرایط جدید و الزامات متغیر محیط کار.",


            required: 4,


            current: 3,


            gap: 1
        }


    ];



    return {


        postTitle,


        postCode:
            postCode || "ثبت نشده",


        postLevel,


        organizationalUnit,


        jobSummary:


            `بر اساس اطلاعات واردشده، پست «${postTitle}» در سطح «${postLevel}» و در واحد «${organizationalUnit}» نیازمند مجموعه‌ای از شایستگی‌های تحلیلی، تخصصی، رفتاری و مدیریتی است. شرح شغل واردشده برای تحلیل عمیق‌تر در موتور هوشمند سامانه استفاده خواهد شد.`,


        shaydaScore: 84,


        matchScore: 86,


        riskScore: 14,


        riskLevel:
            "ریسک پایین",


        riskExplanation:


            "بر اساس ارزیابی اولیه، ریسک عدم احراز پست پایین برآورد می‌شود. با این حال، وجود شکاف در برخی شایستگی‌ها مانند یادگیری و توسعه، انطباق‌پذیری و تفکر تحلیلی می‌تواند در صورت عدم توسعه فرد، بر عملکرد آینده اثرگذار باشد.",


        competencies,


        technicalSkills: [


            "تحلیل اطلاعات مرتبط با شغل",


            "آشنایی با فرآیندهای تخصصی واحد",


            "توانایی تحلیل و گزارش‌دهی",


            "کار با ابزارهای مرتبط با حوزه شغلی"


        ],


        behavioralSkills: [


            "تفکر تحلیلی",


            "حل مسئله",


            "تصمیم‌گیری",


            "ارتباط مؤثر",


            "کار تیمی"


        ],


        softwareSkills: [


            "Microsoft Excel",


            "Microsoft Word",


            "ابزارهای گزارش‌دهی و تحلیل داده"


        ],


        strengths: [


            "مسئولیت‌پذیری",


            "تصمیم‌گیری",


            "کار تیمی",


            "تمرکز بر نتیجه"


        ],


        developmentRoadmap:


            "توسعه مهارت‌های تحلیلی → تقویت مهارت‌های تخصصی → توسعه توانایی تصمیم‌گیری → آمادگی برای پذیرش مسئولیت‌های سطح بالاتر",


        trainingCourses: [


            "تفکر تحلیلی و حل مسئله",


            "تصمیم‌گیری مبتنی بر داده",


            "مهارت‌های تخصصی مرتبط با پست",


            "مدیریت عملکرد و هدف‌گذاری"


        ],


        improvementAreas: [


            "تقویت تفکر تحلیلی",


            "افزایش توانایی یادگیری و توسعه",


            "تقویت انطباق‌پذیری",


            "توسعه مهارت‌های تخصصی مرتبط با پست"


        ],


        managementRecommendation:


            "پست موردنظر از نظر ساختار شایستگی قابلیت احراز دارد. پیشنهاد می‌شود پیش از تصمیم نهایی، سطح واقعی شایستگی‌های فرد با استفاده از ارزیابی‌های معتبر سازمانی بررسی شده و برای شکاف‌های شناسایی‌شده برنامه توسعه فردی تدوین شود.",


        analysisExplanation:


            "امتیاز SHAYDA Score و درصد تطابق بر اساس ترکیب اولیه شایستگی‌ها، سطح پست و اطلاعات شرح شغل در این نسخه آزمایشی تولید شده‌اند. در نسخه متصل به سرویس تحلیل هوشمند، این نتایج به‌صورت پویا از اطلاعات واقعی پست و مدل تحلیل تولید خواهند شد."


    };


}



/* ==========================================
        RENDER RESULTS
========================================== */


function renderResults(data) {



    /* ======================================
            BASIC INFORMATION
    ====================================== */


    resultPostTitle.textContent =
        data.postTitle;


    resultPostCode.textContent =
        data.postCode;


    resultPostLevel.textContent =
        data.postLevel;


    resultOrganizationalUnit.textContent =
        data.organizationalUnit;



    /* ======================================
            SCORES
    ====================================== */


    shaydaScore.textContent =
        `${data.shaydaScore} / 100`;


    matchScore.textContent =
        `${data.matchScore}%`;


    riskScore.textContent =
        `${data.riskScore}% — ${data.riskLevel}`;



    /* ======================================
            TEXT RESULTS
    ====================================== */


    jobSummary.textContent =
        data.jobSummary;


    riskExplanation.textContent =
        data.riskExplanation;


    managementRecommendation.textContent =
        data.managementRecommendation;


    analysisExplanation.textContent =
        data.analysisExplanation;



    /* ======================================
            COMPETENCIES
    ====================================== */


    renderCompetencies(
        data.competencies
    );



    /* ======================================
            SKILLS
    ====================================== */


    renderList(
        technicalSkills,
        data.technicalSkills
    );


    renderList(
        behavioralSkills,
        data.behavioralSkills
    );


    renderList(
        softwareSkills,
        data.softwareSkills
    );


    renderList(
        strengths,
        data.strengths
    );



    /* ======================================
            DEVELOPMENT
    ====================================== */


    developmentRoadmap.textContent =
        data.developmentRoadmap;



    /* ======================================
            TRAINING
    ====================================== */


    renderList(
        trainingCourses,
        data.trainingCourses
    );



    /* ======================================
            IMPROVEMENT
    ====================================== */


    renderList(
        improvementAreas,
        data.improvementAreas
    );



    /* ======================================
            SHOW RESULTS
    ====================================== */


    resultsSection.style.display =
        "block";



    resultsSection.classList.remove(
        "zoom"
    );



    void resultsSection.offsetWidth;



    resultsSection.classList.add(
        "zoom"
    );



    setTimeout(() => {


        resultsSection.scrollIntoView({


            behavior:"smooth",


            block:"start"


        });


    },100);


}



/* ==========================================
        RENDER COMPETENCIES
========================================== */


function renderCompetencies(
    competencies
) {



    competenciesTable.innerHTML =
        "";



    competencies.forEach(
        (item,index) => {



            const row =
                document.createElement(
                    "tr"
                );



            row.innerHTML = `


                <td>
                    ${index + 1}
                </td>


                <td>
                    <strong>
                        ${escapeHtml(item.name)}
                    </strong>
                </td>


                <td>
                    ${escapeHtml(item.definition)}
                </td>


                <td>
                    ${item.required} از 5
                </td>


                <td>
                    ${item.current} از 5
                </td>


                <td>
                    ${item.gap}
                </td>


            `;



            competenciesTable.appendChild(
                row
            );


        }
    );


}



/* ==========================================
        RENDER LIST
========================================== */


function renderList(
    container,
    items
) {



    container.innerHTML =
        "";



    items.forEach(
        item => {



            const li =
                document.createElement(
                    "li"
                );



            li.textContent =
                item;



            container.appendChild(
                li
            );


        }
    );


}



/* ==========================================
        CLEAR FORM
========================================== */


function clearForm() {



    postTitleInput.value =
        "";


    postCodeInput.value =
        "";


    postLevelInput.value =
        "";


    organizationalUnitInput.value =
        "";


    jobTextInput.value =
        "";



    resultsSection.style.display =
        "none";



    window.scrollTo({


        top:0,


        behavior:"smooth"


    });


}



/* ==========================================
        LOADING STATE
========================================== */


function setLoadingState(
    isLoading
) {



    if (!analyzeBtn) {


        return;


    }



    if (isLoading) {



        analyzeBtn.disabled =
            true;



        analyzeBtn.dataset.originalText =
            analyzeBtn.textContent;



        analyzeBtn.textContent =
            "در حال تحلیل...";



        analyzeBtn.style.opacity =
            "0.7";



        analyzeBtn.style.cursor =
            "wait";



    } else {



        analyzeBtn.disabled =
            false;



        analyzeBtn.textContent =
            analyzeBtn.dataset.originalText
            ||
            "تحلیل هوشمند شغل";



        analyzeBtn.style.opacity =
            "1";



        analyzeBtn.style.cursor =
            "pointer";


    }


}



/* ==========================================
        MESSAGE
========================================== */


function showMessage(
    message
) {


    alert(message);


}



/* ==========================================
        HTML ESCAPE
========================================== */


function escapeHtml(
    value
) {


    const div =
        document.createElement(
            "div"
        );



    div.textContent =
        value;



    return div.innerHTML;


}



/* ==========================================
        PDF BUTTON
========================================== */


if (downloadPdfBtn) {


    downloadPdfBtn.addEventListener(


        "click",


        () => {


            showMessage(


                "ماژول تولید گزارش PDF در مرحله بعدی فعال خواهد شد."


            );


        }


    );


}



/* ==========================================
        END
========================================== */
