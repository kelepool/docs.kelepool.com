import{_ as o,r as i,o as r,c,a as e,b as t,e as s,d as a}from"./app.aa16d652.js";const l={},p=s('<h1 id="posture-how-can-wallets-safely-participate-in-the-wave-of-eth-staking" tabindex="-1"><a class="header-anchor" href="#posture-how-can-wallets-safely-participate-in-the-wave-of-eth-staking" aria-hidden="true">#</a> Posture: How can wallets safely participate in the wave of ETH Staking?</h1><p>With the successful completion of the merger of ETH2.0, the enthusiasm for staking is constantly hitting new highs. According to the current data on the chain, the total amount of stakings on the Ethereum chain has reached an astonishing <code>more than 14 million ETH</code>, and nearly <code>440,000 verification nodes</code> are running stably, and <code>1000-2000 ETH</code> are staked every day , while ensuring the security of Ethereum, these nodes are also earning huge profits.</p><p>With the addition of the validator\u2019s proposal fee, it is expected that the profit of Nianhua will reach about <code>6%-10%</code>. Looking at the well-known staking platforms currently on the market, there are almost a handful of which can safely and stably achieve this profit.</p><p>After staking 32ETH, the user will get a verifier on the chain. The verifier first enters the staking queuing system and activates in about <code>24 hours - 14 days</code>. This process depends on the current number of staking queues. After activation, each verifier Period (6.4 minutes) will receive staking income.</p><p>In order to realize the above staking process, it is necessary to generate a &quot;withdrawal certificate&quot; for the user. The withdrawal certificate is the certificate for the user to withdraw the staked principal and income in the future, and it is also one of the most important parameters for creating a validator on the chain.</p><p>There are two main ways to generate ETH2.0 withdrawal vouchers:</p>',6),d=a("The wallet integrates the "),u={href:"https://eips.ethereum.org/EIPS/eip-2334#eth2-specific-parameters",target:"_blank",rel:"noopener noreferrer"},h=a("EIP2334:BLS12-381"),k=a(" algorithm to generate ETH2.0 withdrawal certificates from the wallet (complex)"),m=a("Use the official "),f={href:"https://github.com/ethereum/consensus-specs/pull/2149",target:"_blank",rel:"noopener noreferrer"},v=a("ETH1_WITHDRAWAL_PREFIX"),b=a(" method to convert the ETH1.0 address into an ETH2.0 withdrawal certificate (simple)"),g=e("p",null,[a("After searching, the current Ledger hardware wallets on the market have implemented the "),e("code",null,"EIP2334:BLS12-381"),a(" algorithm, which may be limited by development complexity or other reasons. Most hardware wallets have not yet supported this algorithm. But don\u2019t worry, the good news is that there is still "),e("code",null,"ETH1_WITHDRAWAL_PREFIX"),a(", basically all wallets that can generate ETH addresses can perfectly support it.")],-1),w=e("p",null,"Next, let\u2019s take a look at how to use these two methods so that each wallet can seamlessly integrate the ETH2.0 staking system.",-1),y=e("h2",{id:"how-to-use-eip2334-bls12-381-method-to-generate-withdrawal-certificate",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#how-to-use-eip2334-bls12-381-method-to-generate-withdrawal-certificate","aria-hidden":"true"},"#"),a(" How to use EIP2334:BLS12-381 method to generate withdrawal certificate?")],-1),_=a("This specification mainly defines the purpose of keys in the key tree, and is a standard for assigning keys generated by "),T={href:"https://eips.ethereum.org/EIPS/eip-2333",target:"_blank",rel:"noopener noreferrer"},E=a("EIP-2333"),H=a(" to specific purposes. It defines a Path string, which is the index to be used when generating the key tree of EIP-2333. This specification is not only designed as the standard of ETH2.0, but also widely adopted by other communities."),x=s(`<p>In order to ensure the safety of the funds staked by users, each verifier has two key pairs, one for fund withdrawal and transfer (<code>withdrawal key</code>), and the other for the verifier&#39;s signature (<code>signing key </code>), the operations that the verifier can perform are divided into two sets of different keys to initiate.</p><p>(1) <code>Withdrawal key</code>: The withdrawal key is used to withdraw the user&#39;s staked principal and income, and it needs to be used after the official withdrawal function of ETH2.0 is launched. The key is related to the security of the user&#39;s funds, so it needs to be stored in a hardware wallet or a cold wallet.</p><p>(2) <code>Signature key</code>: The signature key refers to the key used by a verifier when signing messages and proposing blocks. Because the verifier must sign at least one message every epoch, the signing key needs to be stored on a third-party networked server.</p><h4 id="_1-basic-principles" tabindex="-1"><a class="header-anchor" href="#_1-basic-principles" aria-hidden="true">#</a> (1) Basic principles</h4><p>EIP2334 paths are defined by integers, and the hierarchical relationship is represented by the separator /. There are 4 levels in the path (plus master node) and at least 4 levels must be used (total of 5 including master node).</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>M / Purpose / Coin_Type /  Account / User


1.M represents the main node (or root) of the tree, the separator / divides the tree into multiple depths, and the symbols used in paths are specified in EIP-2333.

2.Purpose is set to 12381, which is the name of the new curve (BLS12-381).

3. Coin_Type is set to 3600 because it is the square of the coin_type (3600==60^2) of ETH1.0.

4.Account It provides users with the ability to set different keys, which can achieve different account levels for a single user.

5. User provides a set of related keys, if a single account has many related uses, it should be kept separate for security reasons.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Students who have developed HD Wallet may know this better. Modifying the last level 0 will generate a different key pair. After obtaining the withdrawal key pair, we can extract the public key as the user&#39;s ETH2.0 <code>withdrawal certificate</code> :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Path to withdrawal key: m/12381/3600/i/0

Path to signing key: m/12381/3600/i/0/0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-how-to-achieve-it" tabindex="-1"><a class="header-anchor" href="#_2-how-to-achieve-it" aria-hidden="true">#</a> (2) How to achieve it?</h4>`,9),q=a("The specific algorithm will not be expanded here due to space reasons. To realize the complete algorithm, you need to be familiar with "),I={href:"https://eips.ethereum.org/EIPS/eip-2333",target:"_blank",rel:"noopener noreferrer"},P=a("EIP-2333"),A=a(". The official Python implementation of this algorithm has been provided. , which can be converted according to the development language of the wallet itself:"),S={href:"https://github.com/ethereum/staking-deposit-cli",target:"_blank",rel:"noopener noreferrer"},C=a("https://github.com/ethereum/staking-deposit-cli"),L=e("h2",{id:"how-to-use-eth1-withdrawal-prefix-to-generate-a-withdrawal-voucher",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#how-to-use-eth1-withdrawal-prefix-to-generate-a-withdrawal-voucher","aria-hidden":"true"},"#"),a(" How to use ETH1_WITHDRAWAL_PREFIX to generate a withdrawal voucher?")],-1),B=a("In order to allow the ETH1.0 wallet address to transition smoothly to the ETH2.0 staking system, the official provides a new way to convert the ETH1.0 address into an ETH2.0 withdrawal certificate. That is the method of "),W={href:"https://github.com/ethereum/consensus-specs/pull/2149",target:"_blank",rel:"noopener noreferrer"},N=a("ETH1_WITHDRAWAL_PREFIX"),M=a(" mentioned above."),j=s(`<p>This method supports all APP wallets, hardware wallets, WEB wallets, etc. that can generate ETH1.0 addresses. You only need to slightly change the user&#39;s ETH1.0 address to get an ETH2.0 withdrawal certificate.</p><p>The converted withdrawal vouchers are all lowercase letters. After the ETH2.0 withdrawal function is launched, the user will use the signature of the ETH1.0 address to withdraw the ETH2.0 staked amount. Please make sure that the conversion is correct.</p><p>The specific conversion method is as follows:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ETH2 withdrawal certificate = 0x01 + 11 00 + ETH1.0 address without 0x

Conversion example:
ETH1.0 deposit address: 0x5dD3BD08cBc8498C8640Abc26D19480219bB0606
ETH2.0 withdrawal certificate: 0x0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This method is much simpler than the above method. Any wallet that supports ETH1.0 address generation can be easily accessed. Next, let\u2019s take a look at how to use the generated ETH2.0 withdrawal certificate.</p><h2 id="how-to-make-the-wallet-support-eth2-0-staking" tabindex="-1"><a class="header-anchor" href="#how-to-make-the-wallet-support-eth2-0-staking" aria-hidden="true">#</a> How to make the wallet support ETH2.0 staking?</h2><p>After generating the ETH2.0 withdrawal certificate through the above two methods, the preparation work on the user&#39;s side is only completed. Running the ETH2 node also needs to generate a signature key pair of the verifier node. This signature key pair must be signed and associated with the user&#39;s withdrawal certificate in order to run the verifier client software on the server to help the user obtain staking income.</p><h4 id="_1-verification-node-signature-key-pair-generation-service" tabindex="-1"><a class="header-anchor" href="#_1-verification-node-signature-key-pair-generation-service" aria-hidden="true">#</a> (1) Verification node signature key pair generation service</h4><p>This service has only one function, which is to let the user pass in the withdrawal certificate, generate the verification node signature key pair of this certificate on the server side, and return some parameters after the signature to the user side, and the user calls the ETH2.0 official staking contract through the wallet can be passed in.</p>`,9),D=a("Since the official has provided the source code of related tools for key pair generation, you can directly modify the official "),R={href:"https://github.com/ethereum/staking-deposit-cli",target:"_blank",rel:"noopener noreferrer"},$=a("ETH-Staking-Deposit-CLI"),F=a(" tool to reduce development cost."),O=s(`<p>Why is such a backend service needed? Can&#39;t users use this tool to generate the verifier key and then upload it to the wallet? Of course, but as the node operator, the wallet must make the user\u2019s staking process simple enough on the one hand, and ensure the security of the verification node key on the other hand. If the verification node key is run by two clients at the same time, the ETH chain will immediately punish or even confiscate the node for security reasons. If the verification node key is in the hands of the user, it is difficult to determine who caused the slashing.</p><p>After the final transformation is completed, the user&#39;s withdrawal certificate will be passed in, and two files will be generated, among which <code>keystore-*.json</code> is the verification node signature key to be run on the server, which needs to be kept safely by the node operator. And <code>deposit_*.json</code> is to pass in the parameters of the official staking deposit contract, which needs to be returned to the front end. These parameters are required to call the staking contract, and its content structure is roughly as follows:</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// validator public key</span>
    <span class="token property">&quot;pubkey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// withdrawal certificate</span>
    <span class="token property">&quot;withdrawal_credentials&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// validator signature</span>
    <span class="token property">&quot;signature&quot;</span><span class="token operator">:</span><span class="token string">&quot;a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// Merkle root</span>
    <span class="token property">&quot;deposit_data_root&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">//ETH network</span>
    <span class="token property">&quot;network_name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Goerli&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-call-eth2-0-official-deposit-contract-staking" tabindex="-1"><a class="header-anchor" href="#_2-call-eth2-0-official-deposit-contract-staking" aria-hidden="true">#</a> (2) Call ETH2.0 official deposit contract staking</h4><p>So far, all the data required for staking is available. The above JSON object contains the parameters that need to be passed in by the official staking deposit contract. Now let\u2019s call the contract to complete the staking process.</p>`,5),V=a("ETH2.0 official deposit contract: "),z={href:"https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa",target:"_blank",rel:"noopener noreferrer"},U=a("0x00000000219ab540356cbb839cbe05303d7705fa"),X=s(`<p>Let&#39;s take javascript as an example to call the official contract staking to create a verification node:</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>

<span class="token comment">// import library</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ethers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;ethers&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// Connect to Metamask wallet</span>
<span class="token keyword">const</span> provider <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>providers<span class="token punctuation">.</span>Web3Provider</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>ethereum<span class="token punctuation">)</span>
<span class="token keyword">await</span> provider<span class="token punctuation">.</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&quot;eth_requestAccounts&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> signer <span class="token operator">=</span> provider<span class="token punctuation">.</span> <span class="token function">getSigner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> userAddress <span class="token operator">=</span> <span class="token keyword">await</span> signer<span class="token punctuation">.</span> <span class="token function">getAddress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Initialize contract parameters</span>
<span class="token keyword">const</span> kelepool <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token string">&quot;0x00000000219ab540356cbb839cbe05303d7705fa&quot;</span><span class="token punctuation">,</span> <span class="token comment">// official contract</span>
  <span class="token literal-property property">abi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string-property property">&quot;anonymous&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token operator">...</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">]</span> <span class="token comment">// official contract ABI, refer to contract link for details</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> contract <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ethers<span class="token punctuation">.</span>Contract</span><span class="token punctuation">(</span>kelepool<span class="token punctuation">.</span>address<span class="token punctuation">,</span> kelepool<span class="token punctuation">.</span>abi<span class="token punctuation">,</span> signer<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">// Assemble staking data (support one user to create multiple validator nodes at the same time)</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// validator public key</span>
    <span class="token string-property property">&quot;pubkey&quot;</span><span class="token operator">:</span> <span class="token string">&quot;86ee4eecf1c83725020cf8667c555b286b54445691da44aa7a671b6d18abf118452e60876216f9adec5e64ff09c3e231&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// withdrawal certificate</span>
    <span class="token string-property property">&quot;withdrawal_credentials&quot;</span><span class="token operator">:</span> <span class="token string">&quot;0100000000000000000000005dd3bd08cbc8498c8640abc26d19480219bb0606&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// validator signature</span>
    <span class="token string-property property">&quot;signature&quot;</span><span class="token operator">:</span><span class="token string">&quot;a61e5ed96b5b22ec9da92cf3f09c24cf9230ec1db99918e9dedfc9440de473f64b7520b5fb40558d0bc9f009dd20731917c3dbf6b3cfd98b48377a190d9e2959df3d2fa2dcec9c09e8be420accc9daa25301d4a2ce1636a5413ac066e7a4628f&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// Merkle root</span>
    <span class="token string-property property">&quot;deposit_data_root&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ebb84a75e241501cc64c4e42dd3cdb7a2f72e6af60ab828b2fb246905eb629e5&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// ETH network (mainnet should be used for the main network)</span>
    <span class="token string-property property">&quot;network_name&quot;</span><span class="token operator">:</span><span class="token string">&quot;Goerli&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// generate staking contract parameters</span>
<span class="token keyword">let</span> prefix <span class="token operator">=</span> <span class="token string">&#39;0x&#39;</span>
<span class="token keyword">let</span> pubkey <span class="token operator">=</span> ethers<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">arrayify</span><span class="token punctuation">(</span>prefix <span class="token operator">+</span> data<span class="token punctuation">.</span>pubkey<span class="token punctuation">)</span>
<span class="token keyword">let</span> withdrawal_credentials <span class="token operator">=</span> ethers<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">arrayify</span><span class="token punctuation">(</span>prefix <span class="token operator">+</span> data<span class="token punctuation">.</span>withdrawal_credentials<span class="token punctuation">)</span>
<span class="token keyword">let</span> signature <span class="token operator">=</span> ethers<span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">arrayify</span><span class="token punctuation">(</span>prefix <span class="token operator">+</span> data<span class="token punctuation">.</span>signature<span class="token punctuation">)</span>
<span class="token keyword">let</span> deposit_data_root <span class="token operator">=</span> data<span class="token punctuation">.</span> deposit_data_root

<span class="token comment">// Execute the contract staking method. If the number of verification nodes above is N, the staking amount must be an integer multiple of 32ETH*N</span>
<span class="token keyword">let</span> amount <span class="token operator">=</span> ethers<span class="token punctuation">.</span> utils<span class="token punctuation">.</span> <span class="token function">parseUnits</span><span class="token punctuation">(</span><span class="token string">&#39;32&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ether&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> tx <span class="token operator">=</span> <span class="token keyword">await</span> contract<span class="token punctuation">.</span> <span class="token function">deposit</span><span class="token punctuation">(</span>pubkey<span class="token punctuation">,</span> withdrawal_credentials<span class="token punctuation">,</span> signature<span class="token punctuation">,</span> deposit_data_root<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">from</span><span class="token operator">:</span> userAddress<span class="token punctuation">,</span> <span class="token comment">// caller account</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> amount<span class="token punctuation">,</span> <span class="token comment">// staking amount</span>
    <span class="token literal-property property">gasLimit</span><span class="token operator">:</span> <span class="token number">10000000</span> <span class="token comment">// Maximum gas limit</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Transaction hash: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>tx<span class="token punctuation">.</span>hash<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-run-the-verification-node-client" tabindex="-1"><a class="header-anchor" href="#_3-run-the-verification-node-client" aria-hidden="true">#</a> (3) Run the verification node client</h4><p>After the call contract staking is completed, there is already a verifier on the ETH2.0 chain with a balance of 32ETH, and it may take about 24 hours to 14 days to take effect, depending on the number of staking queues.</p><p>Now it is time to run a validator client, perform block signing and secure the ETH network, and at the same time earn the benefits of network rewards.</p><p>Choose a client to run the validator on:</p><p>-Nimbus</p><p>-Prysm</p><ul><li><p>Lighthouse</p></li><li><p>Teku</p></li></ul><p>Here, <code>Lighthouse</code> is used to run the verification node, and using Docker will make the whole process easier:</p><p>For detailed installation method, please refer to the official tutorial:</p>`,11),G={href:"https://lighthouse-book.sigmaprime.io/mainnet-validator.html",target:"_blank",rel:"noopener noreferrer"},J=a("https://lighthouse-book.sigmaprime.io/mainnet-validator.html"),K=s(`<p>Start the beacon chain:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker run \\
    --network host \\
    -v $HOME/.lighthouse:/root/.lighthouse sigp/lighthouse \\
    lighthouse --network mainnet bn --staking --http-address 0.0.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Start the validator:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
$ docker run \\
    --network host \\
    -v $HOME/.lighthouse:/root/.lighthouse \\
    sigp/lighthouse \\
    lighthouse --network mainnet vc


$ docker run -it \\
    -v $HOME/.lighthouse:/root/.lighthouse \\
    -v $(pwd)/validator_keys:/root/validator_keys \\
    sigp/lighthouse \\
    lighthouse --network mainnet account validator import --directory /root/validator_keys

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note here that the validator key is stored in /root/validator_keys, and docker will automatically import your key.</p><h4 id="_4-query-node-status" tabindex="-1"><a class="header-anchor" href="#_4-query-node-status" aria-hidden="true">#</a> (4) Query node status</h4><p>Finally, you can query the status on the official validator node browser:</p>`,7),Q={href:"https://beaconcha.in/validator/800003d8af8aa481646da46d0d00ed2659a5bb303e0d88edf468abc1259a1f23ccf12eaeaa3f80511cfeaf256904a72a",target:"_blank",rel:"noopener noreferrer"},Y=a("https://beaconcha.in/validator/validator node public key"),Z=s('<h2 id="set-partner-fee-and-payment-address" tabindex="-1"><a class="header-anchor" href="#set-partner-fee-and-payment-address" aria-hidden="true">#</a> Set partner fee and payment address</h2><ol><li>Partners can contact Coke Mining Pool to set up large pledge procedures, channel marks, payment address, fee type, etc. After the pledge is completed, the contract will automatically transfer the handling fee to the payment address set by the partner. Kele Pool currently charges 0.05ETH as a handling fee for 32ETH staking.</li></ol><ul><li><p>If the source when the user pledges matches the partner channel flag set by the partner, the contract will require the user to pay the partner fee</p></li><li><p>Partners can query their own handling fee information through the contract&#39;s getPartnerInfo</p></li><li><p>The partner does not set the handling fee or the handling fee is set to 0. By default, each node charges 0.05 handling fee</p></li></ul><ol start="2"><li>There are two ways to collect the handling fee (take the user as a pledge of 10 verification nodes at a time, and the partner sets a handling fee of 0.1ETH as an example)</li></ol><ul><li><p>Charged according to the number of nodes: the contract will charge 1.5ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 1ETH will be automatically transferred to the partner</p></li><li><p>Charged per pledge: the contract will charge 0.6ETH as a handling fee, of which 0.5ETH will be given to the Coke mining pool, and 0.1ETH will be automatically transferred to the partner</p></li></ul><h2 id="in-conclusion" tabindex="-1"><a class="header-anchor" href="#in-conclusion" aria-hidden="true">#</a> In conclusion</h2><p>The above is the entire staking process of ETH2.0. If there is no accident during the process, your validator node will be activated in about (24 hours - 14 days), depending on the current staking queue situation. After the verifier is activated, every 6.4 minutes will see income entering the balance.</p><p>At present, there are also some platforms that provide one-stop access services. The wallet side only needs to simply integrate to have all the above functions, such as [Coke Pool](https://docs.kelepool.com/zh/ developers/ethereum/api/Hardware.html), you can choose according to your own needs.</p>',8);function ee(ae,ne){const n=i("ExternalLinkIcon");return r(),c("div",null,[p,e("ul",null,[e("li",null,[d,e("a",u,[h,t(n)]),k]),e("li",null,[m,e("a",f,[v,t(n)]),b])]),g,w,y,e("p",null,[_,e("a",T,[E,t(n)]),H]),x,e("p",null,[q,e("a",I,[P,t(n)]),A]),e("p",null,[e("a",S,[C,t(n)])]),L,e("p",null,[B,e("a",W,[N,t(n)]),M]),j,e("p",null,[D,e("a",R,[$,t(n)]),F]),O,e("p",null,[V,e("a",z,[U,t(n)])]),X,e("p",null,[e("a",G,[J,t(n)])]),K,e("p",null,[e("a",Q,[Y,t(n)])]),Z])}var se=o(l,[["render",ee],["__file","knowledge.html.vue"]]);export{se as default};
