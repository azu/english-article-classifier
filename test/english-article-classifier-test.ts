// MIT © 2017 azu
import * as fs from "fs";
import * as path from "path";
import { classifyArticle } from "../src/english-article-classifier";
import * as assert from "assert";

const trimComment = (text: string) => text.replace(/#.*$/, "");
const isNotEmpty = (text: string) => text.length > 0;
/**
 * Test fixtures
 *
 * - https://github.com/rossmeissl/indefinite_article/blob/master/test/test_indefinite_article.rb
 * - https://github.com/gitpan/Lingua-EN-Inflexion/blob/master/t/indefinite.t
 */
const AnWords = fs
    .readFileSync(path.join(__dirname, "fixtures/An.txt"), "utf-8")
    .trim()
    .split("\n")
    .map(trimComment)
    .filter(isNotEmpty);
const AWords = fs
    .readFileSync(path.join(__dirname, "fixtures/A.txt"), "utf-8")
    .trim()
    .split("\n")
    .map(trimComment)
    .filter(isNotEmpty);
const UnknownWords = fs
    .readFileSync(path.join(__dirname, "fixtures/Unknown.txt"), "utf-8")
    .trim()
    .split("\n")
    .map(trimComment)
    .filter(isNotEmpty);
describe("english-article-classifier", () => {
    describe("a", () => {
        AWords.forEach(aWord => {
            it(`"${aWord}" should be "a"`, () => {
                const result = classifyArticle(aWord);
                console.log(aWord);
                assert.strictEqual(result.type, "a", `${aWord}: ${result.reason}`);
            });
        });
    });
    describe("an", () => {
        AnWords.forEach(anWord => {
            it(`"${anWord}" should be "an"`, () => {
                const result = classifyArticle(anWord);
                assert.strictEqual(result.type, "an", `${anWord}: ${result.reason}`);
            });
        });
    });
    // Currently this is unknown
    // Welcome to pull request!
    describe("unknown", () => {
        UnknownWords.forEach(unknownWord => {
            it(`"${unknownWord}" should be "unknown"`, () => {
                const result = classifyArticle(unknownWord);
                assert.strictEqual(result.type, "unknown", `${unknownWord}: ${result.reason}`);
            });
        });
    });
});
