import{_ as a,r as o,o as r,c as n,a as e,b as d,e as h,d as c}from"./app.aa16d652.js";const i={},s=h('<h1 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h1><h3 id="how-to-round-up-the-redemption-withdrawal-amount" tabindex="-1"><a class="header-anchor" href="#how-to-round-up-the-redemption-withdrawal-amount" aria-hidden="true">#</a> How to round up the redemption/withdrawal amount?</h3><p>The redemption amount and cash withdrawal amount should be rounded down to avoid exceeding the maximum redemption/withdrawal amount after rounding.</p><h3 id="how-to-catch-interface-exceptions" tabindex="-1"><a class="header-anchor" href="#how-to-catch-interface-exceptions" aria-hidden="true">#</a> How to catch interface exceptions?</h3><p>The exception must be captured for the interface. Only when the code returned by the interface is 0, the execution is successful. Other values are execution exceptions, and the exception log should be recorded and the user should be prompted.</p><h3 id="can-t-redeem-the-node-that-just-took-effect" tabindex="-1"><a class="header-anchor" href="#can-t-redeem-the-node-that-just-took-effect" aria-hidden="true">#</a> Can&#39;t redeem the node that just took effect?</h3><p>Due to official restrictions, nodes that have just taken effect cannot be redeemed, so the redemption operation can only be performed after waiting for 24 hours after the large-amount pledged node becomes effective. We have added a redeemable status query interface, which can obtain the list of nodes that can be redeemed by the user through the amount or node ID. This interface should be used to check when a large amount is redeemed. For details, please refer to the document:</p>',7),u={href:"https://docs.kelepool.com/zh/developers/ethereum/api/#FAQ",target:"_blank",rel:"noopener noreferrer"},l=c("https://docs.kelepool.com/zh/developers/ethereum/api/#FAQ");function p(f,m){const t=o("ExternalLinkIcon");return r(),n("div",null,[s,e("p",null,[e("a",u,[l,d(t)])])])}var w=a(i,[["render",p],["__file","index.html.vue"]]);export{w as default};