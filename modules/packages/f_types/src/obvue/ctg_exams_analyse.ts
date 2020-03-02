export interface _ctg_exams_analyse {

    "analysis": {
        "bhr": number,
        "ltv": number,
        "stv": number,
        "acc": {
            "index": number;
            "start": number;
            "end": number;
            "peak": number;
            "duration": number;
            "ampl": number;
        }[],
        "dec": [
        ],
        "fm": null,
        "fhrbaselineMinute": number[],
        "ucdata": {
            "ucIndex": number[],
            "uctimes": number,
            "ucStrong": number,
            "uckeeptime": number,
            "ucdurationtime": number
        }
    },
    "score": {
        "ret": number,
        "msg": string,
        "nstdata": null,
        "cstdata": null,
        "sogcdata": null,
        "kerbsdata": null,
        "fischerdata": {
            "bhrscore": number,
            "ltvscore": number,
            "stvscore": number,
            "accscore": number,
            "decscore": number,
            "totalscore": number,
            "bhrvalue": number,
            "ltvalue": number,
            "stvvalue": number,
            "accvalue": number,
            "decvalue": number
        }
    }
}



