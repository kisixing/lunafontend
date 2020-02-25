// 硬编码一个二进制 trie
type BinaryTrie = [[[[[[[[0, 1], [2, 3]], [[4, 5], [6, 7]]], [[[8, 9], [10, 11]], [[12, 13], [14, 15]]]]
    , [[[[16, 17], [18, 19]], [[20, 21], [22, 23]]], [[[24, 25], [26, 27]], [[28, 29], [30, 31]]]]],
    [[[[[32, 33], [34, 35]], [[36, 37], [38, 39]]], [[[40, 41], [42, 43]], [[44, 45], [46, 47]]]],
        [[[[48, 49], [50, 51]], [[52, 53], [54, 55]]], [[[56, 57], [58, 59]], [[60, 61], [62, 63]]]]]],
    [[[[[[64, 65], [66, 67]], [[68, 69], [70, 71]]], [[[72, 73], [74, 75]], [[76, 77], [78, 79]]]], [[[[80, 81], [82, 83]], [[84, 85], [86, 87]]], [[[88, 89], [90, 91]], [[92, 93], [94, 95]]]]], [[[[[96, 97], [98, 99]], [[100, 101], [102, 103]]], [[[104, 105], [106, 107]], [[108, 109], [110, 111]]]], [[[[112, 113], [114, 115]], [[116, 117], [118, 119]]], [[[120, 121], [122, 123]], [[124, 125], [126, 127]]]]]]], [[[[[[[128, 129], [130, 131]], [[132, 133], [134, 135]]], [[[136, 137], [138, 139]], [[140, 141], [142, 143]]]], [[[[144, 145], [146, 147]], [[148, 149], [150, 151]]], [[[152, 153], [154, 155]], [[156, 157], [158, 159]]]]], [[[[[160, 161], [162, 163]], [[164, 165], [166, 167]]], [[[168, 169], [170, 171]], [[172, 173], [174, 175]]]], [[[[176, 177], [178, 179]], [[180, 181], [182, 183]]], [[[184, 185], [186, 187]], [[188, 189], [190, 191]]]]]], [[[[[[192, 193], [194, 195]], [[196, 197], [198, 199]]], [[[200, 201], [202, 203]], [[204, 205], [206, 207]]]], [[[[208, 209], [210, 211]], [[212, 213], [214, 215]]], [[[216, 217], [218, 219]], [[220, 221], [222, 223]]]]], [[[[[224, 225], [226, 227]], [[228, 229], [230, 231]]], [[[232, 233], [234, 235]], [[236, 237], [238, 239]]]], [[[[240, 241], [242, 243]], [[244, 245], [246, 247]]], [[[248, 249], [250, 251]], [[252, 253], [254, 255]]]]]]]];

// 数组操作
type Copy<T, S extends any> = { [P in keyof T]: S[P] };

type Unshift<T, A> = (
    (a: A, ...b: T extends any[] ? T : never) => void
) extends (...a: infer R) => void ? R : never;

type Push<T, A> =
    Copy<Unshift<T, any>, T & Record<string, A>>;

// 搜索二进制 trie
type SearchInTrie<Num, Node, Digits> = {
    1: Node extends [infer A, infer B]
    ? Num extends A ? Push<Digits, 0>
    : Num extends B ? Push<Digits, 1>
    : never : never;

    0: Node extends [infer A, infer B]
    ? SearchInTrie<Num, A, Push<Digits, 0>>
    | SearchInTrie<Num, B, Push<Digits, 1>>
    : never;
}[Node extends [number, number] ? 1 : 0];

// 定义数字类型
type Digit = 0 | 1;
type Bits = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
type Uint8 = Record<Bits, Digit>; // 也可以定义成8个Digit的数组，这样写比较简短

type AsDigit<T> = T extends Digit ? T : never;
type AsUint8<T> = T extends Uint8 ? T : never;

// 数字转二进制表示
type ToUint8<A extends number> =
    SearchInTrie<A, BinaryTrie, []>;

// 二进制表示转数字
type ToNumber<A extends Uint8> =
    BinaryTrie[A[0]][A[1]][A[2]][A[3]][A[4]][A[5]][A[6]][A[7]];

// 两个1 bit数相加，C 表示进位
type BitAdd<A extends Digit, B extends Digit, C extends Digit> = [
    [[[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    [[[1, 0], [0, 1]], [[0, 1], [1, 1]]]
][A][B][C];

// 8位数相加
type Uint8Add<A extends Uint8, B extends Uint8> =
    BitAdd<A[7], B[7], 0> extends [infer S7, infer C]
    ? BitAdd<A[6], B[6], AsDigit<C>> extends [infer S6, infer C]
    ? BitAdd<A[5], B[5], AsDigit<C>> extends [infer S5, infer C]
    ? BitAdd<A[4], B[4], AsDigit<C>> extends [infer S4, infer C]
    ? BitAdd<A[3], B[3], AsDigit<C>> extends [infer S3, infer C]
    ? BitAdd<A[2], B[2], AsDigit<C>> extends [infer S2, infer C]
    ? BitAdd<A[1], B[1], AsDigit<C>> extends [infer S1, infer C]
    ? BitAdd<A[0], B[0], AsDigit<C>> extends [infer S0, infer C]
    // ? C extends 1 ? "overflow" :
    ? AsUint8<[S0, S1, S2, S3, S4, S5, S6, S7]>
    : never : never : never : never : never : never : never : never;

// 位取反
type Reverse = [1, 0];
type Uint8Reverse<A extends Uint8> = [
    Reverse[A[0]],
    Reverse[A[1]],
    Reverse[A[2]],
    Reverse[A[3]],
    Reverse[A[4]],
    Reverse[A[5]],
    Reverse[A[6]],
    Reverse[A[7]]
];

// 两个特殊数字方便使用
type ZERO = [0, 0, 0, 0, 0, 0, 0, 0];
type ONE = [0, 0, 0, 0, 0, 0, 0, 1];

// 补码
type Uint8Negate<A extends Uint8> =
    Uint8Add<Uint8Reverse<A>, ONE>;

// 8位数相减
type Uint8Sub<A extends Uint8, B extends Uint8> =
    Uint8Add<A, Uint8Negate<B>>;

// 左移
type LShift<A extends Uint8, B extends number, P extends Digit> =
    B extends 1 ? [A[1], A[2], A[3], A[4], A[5], A[6], A[7], P]
    : B extends 2 ? [A[2], A[3], A[4], A[5], A[6], A[7], P, P]
    : B extends 3 ? [A[3], A[4], A[5], A[6], A[7], P, P, P]
    : B extends 4 ? [A[4], A[5], A[6], A[7], P, P, P, P]
    : B extends 5 ? [A[5], A[6], A[7], P, P, P, P, P]
    : B extends 6 ? [A[6], A[7], P, P, P, P, P, P]
    : B extends 7 ? [A[7], P, P, P, P, P, P, P]
    : B extends 0 ? A : [P, P, P, P, P, P, P, P];

// 8位数乘1位数
type BitMul<A extends Uint8, B extends Digit, C extends Bits> =
    B extends 1 ? LShift<A, C, 0> : ZERO;

// 8位数相乘
type Uint8Mul<A extends Uint8, B extends Uint8> =
    Uint8Add<ZERO, BitMul<A, B[7], 0>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[6], 1>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[5], 2>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[4], 3>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[3], 4>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[2], 5>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[1], 6>> extends infer S
    ? Uint8Add<AsUint8<S>, BitMul<A, B[0], 7>>
    : never : never : never : never : never : never : never;

// 比较结果
type EQ = 0;
type GT = 1;
type LT = 2;

// 1位数比较
type BitCMP<A extends Digit, B extends Digit> =
    [[EQ, LT], [GT, EQ]][A][B];

// 8位数比较
type Uint8CMP<A extends Uint8, B extends Uint8> =
    BitCMP<A[0], B[0]> extends GT | LT ? BitCMP<A[0], B[0]>
    : BitCMP<A[1], B[1]> extends GT | LT ? BitCMP<A[1], B[1]>
    : BitCMP<A[2], B[2]> extends GT | LT ? BitCMP<A[2], B[2]>
    : BitCMP<A[3], B[3]> extends GT | LT ? BitCMP<A[3], B[3]>
    : BitCMP<A[4], B[4]> extends GT | LT ? BitCMP<A[4], B[4]>
    : BitCMP<A[5], B[5]> extends GT | LT ? BitCMP<A[5], B[5]>
    : BitCMP<A[6], B[6]> extends GT | LT ? BitCMP<A[6], B[6]>
    : BitCMP<A[7], B[7]>;

// 简单求余
type Remainder<A extends Uint8, B extends Uint8> =
    Uint8CMP<A, B> extends LT ? [0, A] : [1, Uint8Sub<A, B>];

// 8位数相除
type Uint8Div<A extends Uint8, B extends Uint8> =
    Remainder<LShift<ZERO, 1, A[0]>, B> extends [infer Q0, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[1]>, B> extends [infer Q1, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[2]>, B> extends [infer Q2, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[3]>, B> extends [infer Q3, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[4]>, B> extends [infer Q4, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[5]>, B> extends [infer Q5, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[6]>, B> extends [infer Q6, infer R]
    ? Remainder<LShift<AsUint8<R>, 1, A[7]>, B> extends [infer Q7, infer R]
    ? [AsUint8<[Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7]>, AsUint8<R>]
    : never : never : never : never : never : never : never : never;

// 加
type Add<A extends number, B extends number> =
    ToNumber<Uint8Add<ToUint8<A>, ToUint8<B>>>;
// 减
type Sub<A extends number, B extends number> =
    ToNumber<Uint8Sub<ToUint8<A>, ToUint8<B>>>;
// 乘
type Mul<A extends number, B extends number> =
    ToNumber<Uint8Mul<ToUint8<A>, ToUint8<B>>>;
// 除
type Div<A extends number, B extends number> =
    B extends 0 ? never :
    ToNumber<Uint8Div<ToUint8<A>, ToUint8<B>>[0]>;
// 取余
type Mod<A extends number, B extends number> =
    B extends 0 ? never :
    ToNumber<Uint8Div<ToUint8<A>, ToUint8<B>>[1]>;

// 测试
type case1_ShouldBe99 = Add<33, 66>;    // 33 + 66 = 99
type case2_ShouldBe0 = Add<255, 1>;     // 255 + 1 = 0 (overflow)

type case3_ShouldBe99 = Sub<123, 24>;   // 123 - 24 = 99
type case4_ShouldBe255 = Sub<0, 1>;     // 0 - 1 = 255 (overflow)

type case5_ShouldBe153 = Mul<17, 9>;    // 17 x 9 = 153
type case6_ShouldBe253 = Mul<255, 3>;   // 255 x 3 = 253 (overflow)

type case7_ShouldBe33 = Div<100, 3>;    // 100 / 3 = 33
type case8_ShouldBeNever = Div<1, 0>;   // 1 / 0 = error (divide by 0)

type case9_ShouldBe1 = Mod<100, 3>;     // 100 % 3 = 1
type case10_ShouldBeNever = Mod<1, 0>;  // 1 % 0 = error (divide by 0)