

class CollatzTree {
    constructor() {
    }

    CalculateTree(branch_count) {
        let branch = (n, list) => {
            list.push(n)
            if (n == 1)
                return list
            n % 2 == 0 ?
                branch((n) / 2, list) :
                branch(3 * n + 1, list)
        }
        let tree = [];
        for (let i = 0; i < branch_count; i++) {
            let list = []
            branch(i + 1, list)
            tree.push(list.reverse())
        }
        return tree;
    }
}

