/** Fill [data-live] nodes from the partner revenue book. Same-origin proxy first. */
(function () {
  var PROXY = '/api/hydrex-revenue';
  var DIRECT = 'https://hydrex-revenue-tracker.vercel.app/api/revenue';

  function compactUsd(n) {
    if (!isFinite(n)) return '$0';
    var abs = Math.abs(n);
    if (abs >= 1e6) {
      var m = n / 1e6;
      var t = (m >= 10 ? m.toFixed(0) : m.toFixed(1)).replace(/\.0$/, '');
      return '$' + t + 'M';
    }
    if (abs >= 1000) return '$' + Math.round(n / 1000).toLocaleString('en-US') + 'K';
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function fill(key, text) {
    [].forEach.call(document.querySelectorAll('[data-live="' + key + '"]'), function (el) {
      el.textContent = text;
    });
  }

  function pull(url) {
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      var ct = r.headers.get('content-type') || '';
      if (!r.ok || ct.indexOf('json') === -1) throw new Error('bad response');
      return r.json();
    });
  }

  function apply(d) {
    var h = d.headlines || {};
    var tvl = d.tvl || {};
    fill('peakTvl', compactUsd(tvl.peakTvl));
    fill('currentTvl', compactUsd(tvl.currentTvl));
    fill('fees', compactUsd(h.realizedFees));
    fill('bribes', compactUsd(h.allBribes || h.realizedBribes));
    fill('total', compactUsd(h.total));
    fill('partners', String(d.partnerCount));
    var active = (d.partners || []).filter(function (p) { return (p.currentTvl || 0) >= 1000; }).length;
    fill('active', String(active));
    if (d.bestMonth) fill('bestMonth', compactUsd(d.bestMonth.revenue));
    var admPeak = (d.partners || [])
      .filter(function (p) { return p.admiralsClub; })
      .reduce(function (s, p) { return s + (p.peakTvl || 0); }, 0);
    if (admPeak > 0) fill('admiralsTvl', compactUsd(admPeak));
    if (d.lastUpdated) {
      var dt = new Date(d.lastUpdated);
      if (!isNaN(dt.getTime())) fill('asOf', dt.toUTCString().replace(' GMT', ' UTC'));
    }
  }

  pull(PROXY).catch(function () { return pull(DIRECT); }).then(apply).catch(function () {});
})();
