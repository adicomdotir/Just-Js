class Custom {
    mark = [];
    adj: number[][] = [];
    n: number;


    constructor(edge: number[], n: number) {
        this.n = n;
        for (let i = 0; i < n; i++) {
            this.adj[i + 1] = [];
            this.mark[i + 1] = false;
        }
        for (let i = 0; i < edge.length; i += 2) {
            this.adj[edge[i]].push(edge[i + 1]);
            this.adj[edge[i + 1]].push(edge[i]);
        }
    }

    dfs(v: number, l: number[]) {
        this.mark[v] = true;
        l.push(v);
        for (let i = 0; i < this.adj[v].length; i++) {
            const elm = this.adj[v][i];
            if (this.mark[elm] === false) {
                this.dfs(elm, l);
            }
        }
    }

    solve(): number[] {
        const connectedComponents: number[] = [];
        let component: number[] = [];

        for (let i = 1; i <= this.n; i++) {
            if (this.mark[i] === false) {
                component = [];
                this.dfs(i, component);
                connectedComponents.push(...component);
            }
        }

        return connectedComponents;
    }
}

class Custom {
    mark = [];
    adj: number[][] = [];
    n: number;
    start: number;
    target: number;


    constructor(edge: number[], n: number, s, t) {
        this.n = n;
        this.start = s;
        this.target = t;
        for (let i = 0; i < n; i++) {
            this.adj[i + 1] = [];
            this.mark[i + 1] = false;
        }
        for (let i = 0; i < edge.length; i += 2) {
            this.adj[edge[i]].push(edge[i + 1]);
            this.adj[edge[i + 1]].push(edge[i]);
        }
    }

    dfs(v: number) {
        this.mark[v] = true;
        for (let i = 0; i < this.adj[v].length; i++) {
            const elm = this.adj[v][i];
            if (this.mark[elm] === false) {
                this.dfs(elm);
            }
        }
    }

    solve(): number[] {
        this.dfs(this.start);

        return this.mark[this.target];
    }
}
