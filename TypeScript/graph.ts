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

class BFS {
    adj: number[][] = [];
    n: number;

    constructor(graph: number[]) {
        this.n = graph.length / 2;
        for (let i = 0; i <= this.n; i++) {
            this.adj[i] = [];
        }
        for (let i = 0; i < graph.length; i += 2) {
            this.adj[graph[i]].push(graph[i + 1]);
            this.adj[graph[i + 1]].push(graph[i]);
        }
    }

    bfs(r) {
        const queue = [];
        const distance = [];
        for (let i = 1; i <= this.n; i++) {
            distance[i] = Number.MAX_VALUE;
        }
        queue.push(r);
        distance[r] = 0;

        while (queue.length > 0) {
            const v = queue.pop();
            for (const u of this.adj[v]) {
                if (distance[u] > distance[v] + 1) {
                    distance[u] = distance[v] + 1;
                    queue.push(u);
                }
            }
        }
        console.log(distance);
    }
}
class BFS {
    adj: number[][] = [];
    n: number;
    start: number;
    target: number;

    constructor(graph: number[], n, s, t) {
        this.n = n;
        for (let i = 0; i <= this.n; i++) {
            this.adj[i] = [];
        }
        for (let i = 0; i < graph.length; i += 2) {
            const x = graph[i];
            const y = graph[i + 1];
            this.adj[x].push(y);
            this.adj[y].push(x);
        }
        this.start = s;
        this.target = t;
    }

    bfs() {
        const queue = [];
        const distance = [];
        const path = [];
        for (let i = 1; i <= this.n; i++) {
            distance[i] = Number.MAX_VALUE;
            path[i] = i.toString() + ' ';
        }
        queue.push(this.start);
        distance[this.start] = 0;

        while (queue.length > 0) {
            const v = queue.pop();
            for (const u of this.adj[v]) {
                if (distance[u] > distance[v] + 1) {
                    distance[u] = distance[v] + 1;
                    path[u] += path[v];
                    queue.push(u);
                }
            }
        }
        console.log(path, distance);
    }
}


