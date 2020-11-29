declare namespace WDIOReporter {
    type TestState = 'passed' | 'pending' | 'failed' | 'skipped';
    type ErrorType = 'AssertionError' | 'Error';

    class Reporter {
        constructor (options: Options);

        onRunnerStart(runner: any): void;
        onBeforeCommand(command: BeforeCommand): void;
        onAfterCommand(command: AfterCommand): void;
        onSuiteStart(suite: Suite): void;
        onHookStart(hook: Hook): void;
        onHookEnd(hook: Hook): void;
        onTestStart(test: Test): void;
        onTestPass(test: Test): void;
        onTestFail(test: Test): void;
        onTestSkip(test: Test): void;
        onTestEnd(test: Test): void;
        onSuiteEnd(suite: Suite): void;
        onRunnerEnd(runner: any): void;

        isSynchronised: boolean;

        write(content: any): void;
    }

    interface Options {
        logFile?: string;
        logLevel?: string;
        stdout?: boolean;
        outputDir?: string;
    }

    interface Suite {
        duration: number;
        fullTitle: string;
        title: string;
        type: string;
        uid: string;
        description?: string;
        cid?: string;
        hooks?: Hook[];
        tests?: Test[];
        tags?: Tag[];
    }

    interface Tag {
        name: string;
    }

    interface Hook extends Test {
        duration?: number;
        parent?: string;
        uid?: string;
    }

    interface Test {
        _duration?: number;
        title: string;
        fullTitle?: string;
        state?: TestState;
        cid?: string;
        uid?: string;
        errors?: Error[];
        error?: Error;
        currentTest?: string;
    }

    interface Error {
        name?: string;
        message: string;
        stack: string;
        type: ErrorType;
        expected: any;
        actual: any;
    }

    interface Command {
        command?: string;
        method: string;
        endpoint: string;
        body?: any;
        sessionId: string;
        cid: string;
    }

    interface BeforeCommand extends Command {
        body?: any;
        params?: any[];
    }

    interface AfterCommand extends Command {
        body?: any;
        result?: any;
    }
}
declare module "@wdio/reporter" {
    export default WDIOReporter.Reporter;
}
