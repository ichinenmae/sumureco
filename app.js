document.getElementById('deliveryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    // Uber データ
    const uberDeliveries = parseFloat(document.getElementById('uberDeliveries').value) || 0; // 数値に変換
    const uberBaseReward = parseFloat(document.getElementById('uberBaseReward').value) || 0; // 数値に変換
    const uberPromotion = parseFloat(document.getElementById('uberPromotion').value) || 0; // 数値に変換
    const uberTip = parseFloat(document.getElementById('uberTip').value) || 0; // 数値に変換

    // menu データ
    const menuDeliveries = parseFloat(document.getElementById('menuDeliveries').value) || 0; // 数値に変換
    const menuBaseReward = parseFloat(document.getElementById('menuBaseReward').value) || 0; // 数値に変換
    const menuPromotion = parseFloat(document.getElementById('menuPromotion').value) || 0; // 数値に変換
    const menuTip = parseFloat(document.getElementById('menuTip').value) || 0; // 数値に変換

    // 合計売上
    const totalUberSales = uberBaseReward + uberPromotion + uberTip;
    const totalMenuSales = menuBaseReward + menuPromotion + menuTip;

    // 時間の計算
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    let workHours = (endHours + endMinutes / 60) - (startHours + startMinutes / 60);
    if (workHours < 0) {
        workHours += 24;
    }

    // 各項目の計算
    const totalSales = totalUberSales + totalMenuSales;
    const totalDeliveries = uberDeliveries + menuDeliveries;

    // ゼロ除算防止
    const uberSalesPerHour = workHours > 0 ? totalUberSales / workHours : 0;
    const menuSalesPerHour = workHours > 0 ? totalMenuSales / workHours : 0;

    const uberDeliveriesPerHour = workHours > 0 ? uberDeliveries / workHours : 0;
    const menuDeliveriesPerHour = workHours > 0 ? menuDeliveries / workHours : 0;

    const uberRewardPerHour = workHours > 0 ? uberBaseReward / workHours : 0;
    const menuRewardPerHour = workHours > 0 ? menuBaseReward / workHours : 0;

    const uberSalesPerDelivery = totalDeliveries > 0 ? totalUberSales / uberDeliveries : 0;
    const menuSalesPerDelivery = totalDeliveries > 0 ? totalMenuSales / menuDeliveries : 0;

    // 結果のフォーマット
    const formatCurrency = (amount) => {
        return amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 2 });
    };

    const formatDecimal = (number) => {
        if (isNaN(number)) {
            number = 0; // 数値がNaNの場合は0にする
        }
        const [integerPart, decimalPart] = number.toFixed(2).split('.');
        return `<span class="integer-part">${integerPart}</span>.<span class="decimal-part">${decimalPart}</span>`;
    };

    // 結果を表示
    document.getElementById('results').innerHTML = `
    <h3>基本情報</h3>
    <p>稼働時間: <span class="result-value">${formatDecimal(workHours)}</span>　時間</p>
    <p>配達件数: <span class="result-value">${totalDeliveries}</span>　件</p>
	<p>総売上: <span class="result-value">${formatDecimal(totalSales)}</span>　円</p>

    <h3>収益内訳</h3>
    <p>配達報酬: <span class="result-value">${formatDecimal(uberBaseReward + menuBaseReward)}</span>　円</p>
    <p>プロモ: <span class="result-value">${formatDecimal(uberPromotion + menuPromotion)}</span>　円</p>
    <p>チップ: <span class="result-value">${formatDecimal(uberTip + menuTip)}</span>　円</p>

    <h3>配達効率</h3>
    <p>時給（総売上）: <span class="result-value">${formatDecimal(uberSalesPerHour + menuSalesPerHour)}</span>　円/時</p>
    <p>時給（配達報酬のみ）: <span class="result-value">${formatDecimal(uberRewardPerHour + menuRewardPerHour)}</span>　円/時</p>
    <p>配達単価: <span class="result-value">${formatDecimal((totalSales / totalDeliveries) || 0)}</span>　円/件</p>
    <p>配達ペース: <span class="result-value">${formatDecimal(uberDeliveriesPerHour + menuDeliveriesPerHour)}</span>　件/時</p>


    <hr>
    <h3>各社詳細



    <div class="company-section">
    <h4>Uber基本情報</h4>
    <p>売上: <span class="result-value">${formatDecimal(totalUberSales)}</span>　円</p>
    <p>件数: <span class="result-value">${uberDeliveries}</span>　件</p>

    <h4>Uber内訳</h4>
    <p>報酬: <span class="result-value">${formatDecimal(uberBaseReward)}</span>　円</p>
    <p>プロモ: <span class="result-value">${formatDecimal(uberPromotion)}</span>　円</p>
    <p>チップ: <span class="result-value">${formatDecimal(uberTip)}</span>　円</p>

    <h4>Uber効率</h4>
    <p>時給（売上）: <span class="result-value">${formatDecimal(uberSalesPerHour)}</span>　円/時</p>
    <p>時給（配達報酬）: <span class="result-value">${formatDecimal(uberRewardPerHour)}</span>　円/時</p>
    <p>配達単価: <span class="result-value">${formatDecimal(uberSalesPerDelivery)}</span>　円/件</p>
    <p>配達ペース: <span class="result-value">${formatDecimal(uberDeliveriesPerHour)}</span>　件/時</p>
    </div>

    <div class="company-section">
    <h4>menu基本情報</h4>
    <p>売上: <span class="result-value">${formatDecimal(totalMenuSales)}</span>　円</p>
    <p>件数: <span class="result-value">${menuDeliveries}</span>　件</p>

    <h4>menu内訳</h4>
    <p>報酬: <span class="result-value">${formatDecimal(menuBaseReward)}</span>　円</p>
    <p>プロモ: <span class="result-value">${formatDecimal(menuPromotion)}</span>　円</p>
    <p>チップ: <span class="result-value">${formatDecimal(menuTip)}</span>　円</p>

    <h4>menu効率</h4>
    <p>時給（売上）: <span class="result-value">${formatDecimal(menuSalesPerHour)}</span>　円/時</p>
    <p>時給（配達報酬） : <span class="result-value">${formatDecimal(menuRewardPerHour)}</span>　円/時</p>
    <p>配達単価: <span class="result-value">${formatDecimal(menuSalesPerDelivery)}</span>　円/件</p>
    <p>配達ペース: <span class="result-value">${formatDecimal(menuDeliveriesPerHour)}</span>　件/時</p>
    </div>
    `;

    document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
