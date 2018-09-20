export default class Team {
    constructor(name, overall, group, logo) {
        this.name = name;
        this.overall = overall;
        this.group = group;
        this.logo = logo;
        this.table = {
            game: 0,
            win: 0,
            draw: 0,
            lose: 0,
            gf: 0,
            ga: 0,
            gd: 0,
            points: 0
        };
    }
}