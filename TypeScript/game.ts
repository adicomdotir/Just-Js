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
        const leagueSize = 12;
        for (let i = 0; i < leagueSize; i++) {
            let idx = Math.floor(Math.random() * names.length);
            while (teamIndex.filter(x => x === idx).length > 0) {
                idx = Math.floor(Math.random() * names.length);
            }
            teamIndex.push(idx);
            console.log(`${names[idx]} is Ranking ${idx + 1}`);
        }
        console.log(' ');
        const fixtures: { h, hg, ag, a }[] = this.generateFixture(leagueSize);
        for (let i = 0; i < fixtures.length; i++) {
            if (i % (leagueSize / 2) === 0) {
                console.log(`Week ${Math.floor(i / (leagueSize / 2)) + 1}`);
            }
            const diff = Math.floor((teamIndex[fixtures[i].h] - teamIndex[fixtures[i].a]) / 4);
            let homeGoal = Math.floor(Math.random() * 6);
            let awayGoal = Math.floor(Math.random() * 6);
            if (diff < 0) {
                homeGoal = Math.floor(Math.random() * (6 + Math.abs(diff)));
                awayGoal = Math.floor(Math.random() * 6);
            } else {
                homeGoal = Math.floor(Math.random() * 6);
                awayGoal = Math.floor(Math.random() * (6 + Math.abs(diff)));
            }
            fixtures[i].hg = homeGoal;
            fixtures[i].ag = awayGoal;
            console.log(`${names[teamIndex[fixtures[i].h]]} ${fixtures[i].hg}-${fixtures[i].ag} ${names[teamIndex[fixtures[i].a]]}`);
        }
        const tables: { id, g, w, d, l, gf, ga, pts }[] = [];
        for (let i = 0; i < leagueSize; i++) {
            tables.push({id: i, g: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0});
        }
        for (let i = 0; i < fixtures.length; i++) {
            if (fixtures[i].hg > fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].h)[0].pts += 3;
                tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].w += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
                tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].l += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
            } else if (fixtures[i].hg < fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].a)[0].pts += 3;
                tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].w += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
                tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].l += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
            } else if (fixtures[i].hg === fixtures[i].ag) {
                tables.filter(x => x.id === fixtures[i].h)[0].pts++;
                tables.filter(x => x.id === fixtures[i].a)[0].pts++;
                tables.filter(x => x.id === fixtures[i].h)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].d += 1;
                tables.filter(x => x.id === fixtures[i].h)[0].gf += fixtures[i].hg;
                tables.filter(x => x.id === fixtures[i].h)[0].ga += fixtures[i].ag;
                tables.filter(x => x.id === fixtures[i].a)[0].g += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].d += 1;
                tables.filter(x => x.id === fixtures[i].a)[0].gf += fixtures[i].ag;
                tables.filter(x => x.id === fixtures[i].a)[0].ga += fixtures[i].hg;
            }
        }
        console.log('Name'.toString().padStart(22, ' ') + `\t\tG\t\tW\t\tD\t\tL\t\tF\t\tA\t\tD\t\tP`);
        tables.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
        for (let i = 0; i < tables.length; i++) {
            console.log(`${names[teamIndex[tables[i].id]].toString().padStart(22, ' ')}\t\t${tables[i].g}\t\t${tables[i].w}\t\t${tables[i].d}\t\t${tables[i].l}\t\t${tables[i].gf}\t\t${tables[i].ga}\t\t${tables[i].gf - tables[i].ga}\t\t${tables[i].pts}`);
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
