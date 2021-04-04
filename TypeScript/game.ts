private justiceLeague() {
        const names = ['Bayern München',
            'Manchester City',
            'Real Madrid',
            'Inter Milan',
            'Barcelona',
            'Paris Saint-Germain',
            'Manchester United',
            'Chelsea FC',
            'Atlético Madrid',
            'Ajax Amsterdam',
            'Juventus',
            'Liverpool FC',
            'FC Porto',
            'Atalanta',
            'RasenBallsport Leipzig',
            'Sevilla',
            'River Plate',
            'Borussia Dortmund',
            'SSC Napoli',
            'Eintracht Frankfurt',
            'Wolfsburg',
            'Slavia Prague',
            'AC Milan',
            'Arsenal',
            'Villarreal',
            'Tottenham Hotspur',
            'Leicester City',
            'Flamengo',
            'Lazio',
            'Lyon',
            'Sporting',
            'Benfica',
            'Shakhtar Donetsk',
            'Roma',
            'Lille',
            'Rangers',
            'Boca Juniors',
            'West Ham United',
            'FK Red Star Belgrade',
            'Al Ahly'];
        const teamIndex = [];
        const leagueSize = 6;
        for (let i = 0; i < leagueSize; i++) {
            const idx = Math.floor(Math.random() * names.length);
            teamIndex.push(idx);
        }
        const fixtures: { h, hg, ag, a }[] = this.generateFixture(leagueSize);
        for (let i = 0; i < fixtures.length; i++) {
            const homeGoal = Math.floor(Math.random() * 6);
            const awayGoal = Math.floor(Math.random() * 6);
            fixtures[i].hg = homeGoal;
            fixtures[i].ag = awayGoal;
            console.log(`${names[teamIndex[fixtures[i].h]]} ${fixtures[i].hg}-${fixtures[i].ag} ${names[teamIndex[fixtures[i].a]]}`);
        }
        const tables: { id, pts }[] = [];
        for (let i = 0; i < leagueSize; i++) {
            tables.push({id: i, pts: 0});
        }
        for (let i = 0; i < fixtures.length; i++) {
            if (fixtures[i].hg > fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].h)[0].pts += 3;
            } else if (fixtures[i].hg < fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].a)[0].pts += 3;
            } else if (fixtures[i].hg === fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].h)[0].pts++;
                tables.filter(x => x.id === fixtures[i].a)[0].pts++;
            }
        }
        for (let i = 0; i < tables.length; i++) {
            console.log(`${names[teamIndex[tables[i].id]]}\t\t${tables[i].pts}`);
        }
    }

    private generateFixture(count) {
        const tmp = [];
        const fixtures: { h, hg, ag, a }[] = [];
        for (let i = 0; i < count; i++) {
            tmp.push(i);
        }
        for (let i = 0; i < count - 1; i++) {
            for (let j = 0; j < count / 2; j++) {
                fixtures.push({h: tmp[j], hg: -1, ag: -1, a: tmp[count - 1 - j]});
            }
            const x = tmp.splice(1, tmp.length - 2);
            tmp.push(...x);
        }
        return fixtures;
    }
